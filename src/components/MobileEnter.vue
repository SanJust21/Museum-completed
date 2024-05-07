<template>
  <p class="text-start pt-5">Please enter a valid mobile number to book tickets.</p>
  <v-form ref="form">
    <v-text-field v-model="mobile" color="teritiary" placeholder="Enter your Mobile Number"
      prepend-inner-icon="mdi-cellphone" variant="underlined" class="mb-4" :rules="mobRules" required></v-text-field>
    <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p>
    <v-btn block height="40" color="green-darken-4" class="bg-gradient" @click="validate"
      :disabled="!isMobileValid || buttonDisabled" :loading="buttonDisabled">Generate OTP</v-btn>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      mobile: null,
      mobRules: [
        value => {
          if (value) return true;
          return 'Mobile is required.';
        },
        value => {
          if (/^\d+$/.test(value)) return true;
          return 'Only digits allowed.';
        },
        value => {
          if ((value?.length === 10) && (/^[6-9]\d{9}$/.test(value))) return true;
          return 'Enter a valid 10 digit number.';
        }],
      isMobileValid: false,
      buttonDisabled: false
    }
  },
  watch: {
    mobile(value) {
      // Check mobile number validity on change
      this.isMobileValid = this.mobRules.every(rule => rule(value) === true);
    }
  },
  methods: {
    async validate() {
      try {
        const { valid } = await this.$refs.form.validate()
        if (valid) {
          try {
            this.buttonDisabled = true;
          const success = await this.$store.dispatch('generateOtp', this.mobile);
            if (success) {
              this.buttonDisabled = false;
            this.$router.push('/otp');
          }
          }
          catch (err) {
            console.error(err);
            this.buttonDisabled = false;
          }
        }
      }
      catch (error) {
        console.error('Error fetching user details', error);
        this.buttonDisabled = false;
      }
    },
  }
};
</script>