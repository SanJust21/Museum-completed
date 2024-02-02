<template>
    <p class="text-start pt-5">Please enter a valid mobile number to book tickets.</p>
    <v-form ref="form">
    <v-text-field
      v-model="mobile"
      color="teritiary"
      placeholder="Enter your Mobile Number"
      prepend-inner-icon="mdi-cellphone"
      variant="underlined"
      class="mb-4"
      :rules="mobRules"
      required
    ></v-text-field>  
    <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p>
        <v-btn
            block
            height="40"
            color = "green-darken-4"
            class="bg-gradient"
            @click="validate"
    >Generate OTP</v-btn>
  </v-form>
    
</template>
<script>
import axios from 'axios';
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
          if ((value?.length === 10 ) && (/^[6-9]\d{9}$/.test(value))) return true;
          return 'Enter a valid 10 digit number.';
        }],

    }
  },
  methods: { 
    async validate () {
      try{
        const { valid } = await this.$refs.form.validate()
      if (valid) {  
        console.log('done')
        const response = await axios.post(`http://localhost:8080/api/2factor/generate-otp`, {
          "mobileNumber": this.mobile,
        });
        if (response.status === 200) {
          console.log(response.data);
          
          const messag = JSON.parse(response.data.message);
          console.log(messag);
          this.$store.commit('setMobile', response.data.mobileNumber);  
          this.$store.commit('setSession', messag);      
          this.$router.push('/otp');
        } 
      }  
      }
      catch(error){
        alert('Error fetching user details', error);
        console.error(error)
      }
          
    }, 
 }
};
  </script>