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
    <v-btn class="my-4" color="green-darken-4" height="40" text="Verify" block @click="verifyOtp"></v-btn>
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
    <v-snackbar v-model="snackbar" color="blue-lighten-1" :timeout="timeout" location="top">
      <p class="text-center fw-bold ">{{ message }}</p>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data: () => ({
    otp: '',
    resendTimeout: null,
    resendCountdown: 10,
    error: '',
    snackbar: false,
    timeout: 6000, 
    message: 'New OTP sent to your mobile number !!'
  }),
  computed: {
    mobile() {
      return this.$store.getters.getMobile;
    },
  },
  methods: {
    async verifyOtp() {
      try {
        const success = await this.$store.dispatch('verifyOtp', {
          otp: this.otp,
          mobile: this.mobile
        });
        if (success) {
          this.$router.push('/booking-page')
        }
      }
      catch (error) {
        this.error = error;
      }
    },
    async resendOtp() {
      try {
        const response = await this.$store.dispatch('generateOtp', this.mobile);
        if (response) {
          this.snackbar = true
        }
      }
      catch (error) {
        this.error = error;
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


