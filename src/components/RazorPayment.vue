<template>
  <v-overlay :model-value="overlay" class="align-center justify-center" persistent>
    <div class="text-center fst-italic  fw-bold ">
      <p>{{ proceed }}</p>
        <p>Please do not refresh the page.</p>
      <v-progress-circular color="primary" size="64" indeterminate></v-progress-circular>
    </div>
  </v-overlay>
</template>
<script>
import axios from 'axios'

export default {

  data() {
    return {
      overlay: true,
      script: `https://checkout.razorpay.com/v1/checkout.js`,
      order_id: null,
      signature: null,
      pay_id: null,
      url: this.$store.getters.getUrl,
      proceed: 'You are being redirected to payment gateway.',
      razorPayScript: null
    }
  },

  computed: {
    details() {
      return this.$store.getters.getDetails
    },
    razor() {
      return this.$store.getters.getRazor
    },
  },

  methods: {
    async loadRazorPay() {
      return new Promise(resolve => {
        const script = document.createElement('script')
        script.src = this.script
        script.onload = () => {
          resolve(true)
          this.overlay = false
        }
        script.onerror = () => resolve(false)
        document.body.appendChild(script)
        this.razorpayScript = script
      })
    },

    removeRazorPayScript() {
      if (this.razorpayScript && this.razorpayScript.parentNode) {
        this.razorpayScript.parentNode.removeChild(this.razorpayScript)
        Array.from(document.body.getElementsByClassName('razorpay-container'))
          .forEach(el => el.remove())
      }
    },

    /**
     * Calls generateTicketQrCode after payment verification succeeds.
     * Stores { userDetails, qrCodeImage } in Vuex via setQR mutation.
     */
    async generateTicketQr(paymentId, categoryId) {
      try {
        this.proceed = 'Generating your ticket...'
        this.overlay = true

        const response = await axios.get(
          `${this.url}/api/onlineBooking/generateTicketQrCode`,
          {
            params: { categoryId, paymentId }
          }
        )

        if (response.status === 200 && response.data) {
          // Store { userDetails: {...}, qrCodeImage: "base64..." } in Vuex
          this.$store.commit('setQR', response.data)
          console.log('[RazorPayment] QR generated successfully:', response.data)
          return true
        } else {
          console.error('[RazorPayment] generateTicketQrCode unexpected response:', response)
          return false
        }
      } catch (error) {
        console.error('[RazorPayment] generateTicketQrCode error:', error)
        return false
      }
    }
  },

  async created() {
    if (!this.razor) {
      console.error(
        '[RazorPayment] razor is null in created().\n' +
        'getRazor getter returned:', this.razor, '\n' +
        'This means setRazor was not committed before payon = true.\n' +
        'Check that createOrder action completed successfully.'
      )
      this.proceed = 'Something went wrong. Redirecting back...'
      setTimeout(() => this.$router.push('/beta/review-details'), 2000)
      return
    }

    console.log('[RazorPayment] razor data from store:', this.razor)

    const result = await this.loadRazorPay()
    if (!result) {
      alert('Failed to load Razorpay script')
      return
    }

    const options = {
      key:         this.razor.razorpayKeyId,
      amount:      this.razor.amount,
      currency:    this.razor.currency,
      name:        'Aksharam Museum',
      description: 'Description of the payment',
      order_id:    this.razor.orderId,

      handler: async (response) => {
        this.pay_id    = response.razorpay_payment_id
        this.order_id  = response.razorpay_order_id
        this.signature = response.razorpay_signature
        this.$store.commit('setPayment', this.pay_id)

        this.proceed = 'Verifying your payment...'
        this.overlay = true

        try {
          // Step 1: Verify payment
          const verifyResponse = await axios.post(
            `${this.url}/api/onlineBooking/verifyPayment`,
            {},
            {
              params: {
                orderId:       this.order_id,
                paymentId:     this.pay_id,
                signatureData: this.signature,
                categoryId:    this.$store.getters.getRazor?.categoryId,
              }
            }
          )

          if (verifyResponse.status === 200) {
            // Step 2: Generate QR ticket after successful verification
            const categoryId = this.$store.getters.getRazor?.categoryId
            const qrSuccess  = await this.generateTicketQr(this.pay_id, categoryId)

            if (qrSuccess) {
              this.$router.push('/beta/loading_ticket')
            } else {
              // QR failed but payment was successful — still navigate, ticket page handles empty state
              console.warn('[RazorPayment] QR generation failed, navigating anyway.')
              this.$router.push('/beta/loading_ticket')
            }
          }
        } catch (error) {
          console.error('[RazorPayment] verifyPayment error:', error)
          this.proceed = 'Payment verification failed. Please contact support.'
          this.overlay = true
        }
      },

      prefill: {
        name:    this.details?.name,
        email:   this.details?.email,
        contact: this.details?.mobile,
      },

      theme: {
        color: '#388E3C'
      },
    }

    const paymentObject = new window.Razorpay(options)

    paymentObject.on('payment.failed', (response) => {
      console.log('[RazorPayment] payment.failed:', response)

      const proceed = confirm(
        `${response.error.description}. Do you want to proceed to another payment method?`
      )

      if (!proceed) {
        this.proceed = 'You are being redirected to home page.'
        this.overlay = true
        paymentObject.close()
        setTimeout(() => {
          sessionStorage.clear()
          this.removeRazorPayScript()
          this.$router.push('/beta/')
        }, 3000)
      }
    })

    paymentObject.open()
  },

  beforeUnmount() {
    this.removeRazorPayScript()
  }
}
</script>