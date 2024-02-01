<template>
  <v-sheet width="350">
    <v-form ref="form">
      <v-text-field
        v-model="name"
        density="compact" 
        variant="underlined"
        label="Name*"
        :rules="nameRules"
       
        required
      ></v-text-field>

      <v-text-field
        v-model="mobileNum"
        density="compact" 
        variant="underlined"
        label="Mobile Number*"
        :rules="mobRules"
        required
      ></v-text-field>

      <v-text-field
            v-model="email"
            density="compact" 
            variant="underlined"
            :rules="emailRules"
            label="E-mail*"
            required
          ></v-text-field>
<div class="d-flex justify-content-between align-items-center mt-3">
  <h6>No. of Adults (Rs.{{ pub[0].price }}): </h6>
      <div class="input-group w-auto align-items-center">
          <input type="button" value="-" class="border icon-shape bg-light font-weight-bold fs-5" @click="decrementAdult">
          <input type="text" max="100" name="quantity" class=" border bg-light text-center icon-shape" v-model="quantityAdult">
          <input type="button" value="+" class="border icon-shape bg-light font-weight-bold fs-5" @click="incrementAdult">
        </div>
</div>

<div class="d-flex justify-content-between align-items-center my-3">
  <h6>No. of Children (Rs.{{ pub[1].price }}): </h6>
  <p class="bg-danger">( 5 to 12 years)</p>
      <div class="input-group w-auto align-items-center">
          <input type="button" value="-" class="border icon-shape bg-light font-weight-bold fs-5" @click="decrementChild">
          <input type="text" max="100" name="quantity" class=" border bg-light text-center icon-shape" v-model="quantityChild">
          <input type="button" value="+" class="border icon-shape bg-light font-weight-bold fs-5" @click="incrementChild">
        </div>
</div>
<hr>
<div class="d-flex justify-content-between ">
  <h5> Total </h5>
  <h5> : </h5>
  <h5> <v-icon
             icon="mdi mdi-currency-inr"
             size="x-small">
            </v-icon>{{total}} </h5>
</div>
<div class="d-flex justify-content-center">
  <v-btn class="mt-4 w-50"  @click="submit">Get Tickets</v-btn>
</div>
      
    </v-form>
  </v-sheet>
</template>

<script>
import {mapGetters} from 'vuex';
  export default {
    data() {
     return{
      pub:this.$store.getters.getPublic || [],
      quantityAdult: 0,
      quantityChild: 0,
      name: '',
      nameRules: [
        value => {
          if (value) return true
          return 'Name is required.'
        },   
        value => {
          if(!/^\s/.test(value)) return true
          return 'Name should not start with a space.'
        }, 
        value => {
          if(/^\D+$/.test(value)) return true
          return 'Name should not contain digits.'
        },
        value => {
          if (value?.length >= 3) return true
          return 'Name must contain atleast 3 characters.'
        },
     
       
      ],
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
          if (value?.length === 10 ) return true;
          return 'Enter a valid number.';
        }
      ],
      email: '',
      emailRules: [
        value => {
          if (value) return true

          return 'E-mail is required.'
        },
        value => {
          if (/.+@.+\..+/.test(value)) return true

          return 'E-mail must be valid.'
        },
      ],
     };
    },
    methods: {
      async submit () {
        const { valid } = await this.$refs.form.validate()

        if (valid && this.total !== 0 && this.$store.getters.getCategory!== null) 
        { 
        const details = {
                        cat:this.$store.getters.getCategory,
                        date:this.$store.getters.getDate,
                        name: this.name,
                        mobile: this.mobileNum,
                        email:this.email,
                        adult:this.quantityAdult,
                        child: this.quantityChild,
                        total: this.total,
                        }
          this.$store.commit('setDetails', details)
          this.$router.push('/review-details')
        } else 
        {alert('Fields should not be empty')}
      },
      incrementAdult() {
      this.quantityAdult += 1
    },
    decrementAdult() {
      if(this.quantityAdult === 0)
        {
        this.quantityAdult = 0;
        }
        else {
        this.quantityAdult -= 1;
        }
    },
    incrementChild() {
      this.quantityChild += 1
    },
    decrementChild() {
      if(this.quantityChild === 0)
        {
        this.quantityChild = 0;
        }
        else {
        this.quantityChild -= 1;
        }
    },
    },
    computed: {
      ...mapGetters(['getMobile']),
      total() {
        if (this.pub && this.pub.length >= 2) {
    return this.quantityAdult * this.pub[0].price + this.quantityChild * this.pub[1].price;
  } else {
    return 0; // or any default value you want
  }
      },
      mobileNum: {
        get(){
          return this.getMobile;
        },
        set(value) {
      this.$store.commit('setMobile', value); 
      },
      // pub() {
      //   return this.$store.getters.getPublic
      // },
    } 
  }};
</script>

<style scoped>
.icon-shape{
    width:2rem;
    height:2rem;
    border-radius: 10px;
}
</style>