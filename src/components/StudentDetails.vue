<template>
  <v-sheet width="350">
    <v-form ref="form" class="p-3">
      <v-text-field v-model="name" density="comfortable" variant="underlined" label="Name of Institution*"
        :rules="nameRules" required></v-text-field>
      <v-select v-model="district" density="comfortable" variant="underlined" required :items="items"
        label="Select District*"></v-select>
      <v-text-field v-model="mobileNum" density="comfortable" variant="underlined" label="Mobile Number*"
        :rules="mobRules" required></v-text-field>
      <v-text-field v-model="email" variant="underlined" :rules="emailRules" label="E-mail*" required></v-text-field>
      <div class="d-flex justify-content-between align-items-center mt-1">
        <h6>No. of Teachers (Rs.{{institute.teacher}}): </h6>
        <div class="input-group w-auto align-items-center">
          <input type="button" value="-" class="border icon-shape bg-light font-weight-bold fs-5"
            @click="updateQuantity('quantityAdult', 'decrement')">
          <input type="text" max="100" name="quantity" class=" border bg-light text-center icon-shape"
            v-model="quantityAdult">
          <input type="button" value="+" class="border icon-shape bg-light font-weight-bold fs-5"
            @click="updateQuantity('quantityAdult', 'increment')">
        </div>
      </div>
      <div class="d-flex justify-content-between align-items-center my-3">
        <h6>No. of Students (Rs.{{institute.student}}): </h6>
        <div class="input-group w-auto align-items-center">
          <input type="button" value="-" class="border icon-shape bg-light font-weight-bold fs-5"
            @click="updateQuantity('quantityChild', 'decrement')">
          <input type="text" max="100" name="quantity" class=" border bg-light text-center icon-shape"
            v-model="quantityChild">
          <input type="button" value="+" class="border icon-shape bg-light font-weight-bold fs-5"
            @click="updateQuantity('quantityChild', 'increment')">
        </div>
      </div>
      <hr>
      <div class="d-flex justify-content-between ">
        <h5> Total </h5>
        <h5> : </h5>
        <h5> <v-icon icon="mdi mdi-currency-inr" size="x-small">
          </v-icon>{{total}} </h5>
      </div>
      <div class="d-flex justify-content-center">
        <v-btn class="mt-4 w-50 text-white" @click="submit" color="green-darken-4">Get Tickets</v-btn>
      </div>
    </v-form>
  </v-sheet>
</template>

<script>
import {mapGetters} from 'vuex';
  export default {
    data() {
     return{
      quantityAdult: this.$store.getters.getDetails.adult || 0,
      quantityChild: this.$store.getters.getDetails.child || 0,
      name: this.$store.getters.getDetails.name || '',
       // institute: this.$store.getters.getInstitute || [],
       institute: this.$store.getters.getPricing.institution || [],
      tax: this.$store.getters.getTax || [],
      items : ['Thiruvananthapuram','Kollam','Pathanamthitta','Alappuzha','Kottayam','Idukki','Ernakulam','Thrissur','Palakkad','Malappuram','Kozhikode','Wayanad','Kannur','Kasaragod'],
      district: this.$store.getters.getDetails.district || null,
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
      email: this.$store.getters.getDetails.email || '',
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
        if (valid && this.total !== 0 && this.$store.getters.getCategory !== null && this.$store.getters.getCapacity !== null) 
        { 
          if(this.quantityAdult === 0 && this.quantityChild >0 ) 
          {
            alert('Atleast one teacher must be present.') 
          }
          else 
          {
            const details = {
              cat:this.$store.getters.getCategory,
              date: this.$store.getters.getDate,
              bDate: this.$store.getters.getBdate,
              slot: this.$store.getters.getCapacity,
              name: this.name,
              mobile: this.mobileNum,
              email:this.email,
              adult:this.quantityAdult,
              child: this.quantityChild,
              total: this.total,
              district: this.district,
              totalTax: this.totalTax
            }
            this.$store.commit('setDetails', details)
            try {
              const res = await this.$store.dispatch('lockSlot', {
                capacity: this.capacity,
                date: details.date,
                slot: details.slot,
                cat: details.cat
              })
              if (res) {
                this.$router.push('/review-details')
              }
            }
            catch (error) {
              console.error(error);
              this.message = 'Capacity not available'
            }
          }
        } else {
          if (this.$store.getters.getCapacity === null) {
            this.message = 'Please select your visit time!';
          }
          else if (this.$store.getters.getCategory === null) {
            this.message = 'Please select your category';
          }
          else if (!valid) {
            this.message = 'Please fill the required fields';
          }
          alert(this.message)
        }
      },
      updateQuantity(type, action) {
        if (action === 'increment') {
          this[type] = parseInt(this[type]) + 1;
        } else if (action === 'decrement' && this[type] > 0) {
          this[type] = parseInt(this[type]) - 1;
        }
      },
    },
    computed: {
      ...mapGetters(['getMobile']),
      total() {
        if (this.institute) {
          return this.quantityAdult * this.institute.teacher + this.quantityChild * this.institute.student;
        } else {
          return 0;
        }
      },
      totalTax() {
        let totalTaxAmount = 0;
        if (this.tax && this.tax.length > 0) {
          for (let i = 0; i < this.tax.length; i++) {
            const tax = this.tax[i];
            if (tax.type === "GST" || tax.type === "IGST") {
              totalTaxAmount += (0.01 * tax.price * this.total);
            } else {
              totalTaxAmount += tax.price;
            }
          }
        }
        return totalTaxAmount.toFixed(2);
      },
      capacity() {
        return parseInt(this.quantityAdult) + parseInt(this.quantityChild);
      },
      mobileNum: {
        get(){
          return this.getMobile;
        },
        set(value) {
          this.$store.commit('setMobile', value); 
        },
      } 
    } 
  }
</script>

<style scoped>
.icon-shape{
    width:2rem;
    height:2rem;
    border-radius: 10px;
}
</style>

