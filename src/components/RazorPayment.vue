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
          resolve(true);
          this.overlay = false;
        }
        script.onerror = () => {
          resolve(false)
        }
        document.body.appendChild(script)
        this.razorpayScript = script;
      })
    },
    removeRazorPayScript() {
      // Remove the Razorpay script element from the DOM
      if (this.razorpayScript && this.razorpayScript.parentNode) {
        this.razorpayScript.parentNode.removeChild(this.razorpayScript);
        const elementsToRemove = document.body.getElementsByClassName('razorpay-container');

        // Convert HTMLCollection to array and loop through each element to remove it
        Array.from(elementsToRemove).forEach(element => {
          element.remove();
        });
      }
    }
  },
  async created() {
    const result = await this.loadRazorPay()
    if (!result) {
      alert('Failed to load razorpay script')
      return
    }
    const options = {
      key: this.razor.razorpayKeyId,
      amount: this.razor.amount,
      currency: this.razor.currency,
      name: `Aksharam Museum`,
      description: `Description of the payment`,
      order_id: this.razor.orderId,

      handler: async (response) => {
        this.pay_id = response.razorpay_payment_id;
        this.order_id = response.razorpay_order_id;
        this.signature = response.razorpay_signature;
        this.$store.commit('setPayment', this.pay_id)
        // console.log(this.pay_id);
        try {
          const response1 = await axios.post(`${this.url}/api/payment/verify-payment`, {
            "orderId": this.order_id,
            "paymentId": this.pay_id,
            "signature": this.signature,
          });

          if (response1.status === 200) {
            this.$router.push('/loading_ticket')
          }
        }
        catch (error) {
          console.error(error);
        }
      },
      prefill: {
        name: this.details.name,
        email: this.details.email,
        contact: this.details.mobile
      },
      "theme": {
        "color": "#388E3C"
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.on('payment.failed', (response) => {
      console.log('Payment failed event triggered');
      console.log('Response:', response);

      const proceed = confirm(`${response.error.description}. Do you want to proceed to another payment method?`);
      console.log('Proceed:', proceed);

      if (!proceed) {
        this.proceed = 'You are being redirected to home page.'
        this.overlay = true;
        paymentObject.close();
        setTimeout(() => {
          sessionStorage.clear();
          this.removeRazorPayScript(); 
          this.$router.push('/');
        }, 3000);
      }
    });
    paymentObject.open();
  },
  beforeUnmount() {
    this.removeRazorPayScript();
  }
};
</script>
