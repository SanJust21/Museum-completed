<template>
  <div>
    <h3 class="text-h6 mb-4">Verify OTP</h3>
    <div class="text-body-2 font-weight-light text-start">
      Enter the code we just sent to your mobile phone <br>
      <span class="font-weight-black">{{ mobile }}</span>
      <span class="ms-3">(</span>
      <router-link to="/" class=" text-decoration-none"><b>change </b></router-link>)
    </div>

    <v-sheet color="surface">
      <v-otp-input v-model="otp" variant="solo" length="6"></v-otp-input>
    </v-sheet>

    <v-btn
      class="my-4"
      color="green-darken-4"
      height="40"
      text="Verify"
      block
      @click="verifyOtp"
    ></v-btn>

    <div class="text-caption">
      Didn't receive the code?
      <div class="text-caption" v-if="resendCountdown > 0">
      Resend in {{ resendCountdown }} seconds
    </div>
    <div v-else>
      <a href="#" @click.prevent="resendOtp" class="text-caption">
        Resend
      </a>
    </div>
    </div>

    
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data: () => ({
    otp: '',
    api: "a6207229-b6e5-11ee-8cbb-0200cd936042",
    resendTimeout: null,
    resendCountdown: 10,
  }),
  computed: {
    mobile() {
      return this.$store.getters.getMobile;
    },
    session() {
      return this.$store.getters.getsession;
    }
  },
  methods: {
    async verifyOtp() {
      try{
        const response = await axios.post('http://localhost:8080/api/2factor/validate-otp', {
          "enteredOtp": this.otp,
          "sessionId": this.session.Details,
          "mobileNumber": this.mobile

        });
        if (response.status === 200) {
          this.$router.push('/booking-page')
        }  
      }
      catch(error){
        alert( error.response.data.message);
      }
    },
    async resendOtp(){
      try{
      const response = await axios.post(`http://localhost:8080/api/2factor/generate-otp`, {
          "mobileNumber": this.mobile,
        });
        if (response.status === 200) {
          alert("New OTP sent!");
          this.verifyOtp;
        }
      }
      catch(error) {
        alert( error.response.data.message);
      } 
    },
    startResendTimer() {

      this.resendTimeout = setInterval(() => {
        if (this.resendCountdown > 0) {
          this.resendCountdown -= 1;
        } else {
          clearInterval(this.resendTimeout);
        }
      }, 1000);
    },
  },    
  mounted() {
    this.startResendTimer();
  },
};
</script>
