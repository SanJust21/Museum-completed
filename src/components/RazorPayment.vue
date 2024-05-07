
<script>
import axios from 'axios'

export default {

  data() {
    return {
      script: `https://checkout.razorpay.com/v1/checkout.js`,
      // razor_id: 'rzp_test_Lh738g2oARGFbD',
      order_id: null,
      signature: null,
      pay_id: null,
      url: this.$store.getters.getUrl,
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
        }
        script.onerror = () => {
          resolve(false)
        }
        document.body.appendChild(script)
      })
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
        "color": "#74a965"
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.on('payment.failed', function (response) {
      console.log(response.error)
      alert(response.error.description);
      
    });
    paymentObject.open();
  }
}
</script>
