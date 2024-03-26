<template>
  <v-sheet width="350">
    <v-form ref="form" class="p-3">
      <v-text-field
        v-model="name"
        density="comfortable"
        variant="underlined"
        label="Name*"
        :rules="nameRules"
        required
      ></v-text-field>

      <v-text-field
        v-model="mobileNum"
        density="comfortable"
        variant="underlined"
        label="Mobile Number*"
        :rules="mobRules"
        required
      ></v-text-field>

      <v-text-field
            v-model="email"
            density="comfortable"
            variant="underlined"
            :rules="emailRules"
            label="E-mail*"
            required
          ></v-text-field>
<div class="d-flex justify-content-between align-items-center mt-1 mb-2">
  <h6 class="mt-1">No. of Adults (Rs.{{ pub[0].price }}): </h6>
  <div class="input-group w-auto align-items-center">
    <input type="button" value="-" class="border icon-shape bg-light font-weight-bold fs-5" @click="decrementAdult">
    <input type="text" max="100" name="quantity" class=" border bg-light text-center icon-shape" v-model="quantityAdult">
    <input type="button" value="+" class="border icon-shape bg-light font-weight-bold fs-5" @click="incrementAdult">
  </div>
</div>

<div class="d-flex justify-content-between align-items-center">
  <div class="d-flex flex-column mb-0">
    <h6 class="mb-0 mt-3">No. of Children (Rs.{{ pub[1].price }}): </h6>
    <p class="lh-1 text-end mb-0" style="font-size:12px; font-style: italic;">( 5 to 12 years)</p>
  </div>
  <div class="input-group w-auto align-items-center">
    <input type="button" value="-" class="border icon-shape bg-light font-weight-bold fs-5" @click="decrementChild">
    <input type="text" max="100" name="quantity" class=" border bg-light text-center icon-shape" v-model="quantityChild">
    <input type="button" value="+" class="border icon-shape bg-light font-weight-bold fs-5" @click="incrementChild">
  </div>
</div>

<div class="d-flex justify-content-between align-items-center">
  <div class="d-flex flex-column">
    <h6 class="mb-0 mt-3">No. of Senior Citizens (Rs.{{ pub[2].price }}): </h6>
    <p class="lh-1 text-end" style="font-size:12px; font-style: italic;">( above 65 years)</p>
  </div>
  <div class="input-group w-auto align-items-center pt-0">
    <input type="button" value="-" class="border icon-shape bg-light font-weight-bold fs-5" @click="decrementSnr">
    <input type="text" max="100" name="quantity" class=" border bg-light text-center icon-shape" v-model="quantitySnr">
    <input type="button" value="+" class="border icon-shape bg-light font-weight-bold fs-5" @click="incrementSnr">
  </div>
</div>

<hr>
<div class="d-flex justify-content-between my-0">
  <h5> Total </h5>
  <h5> : </h5>
  <h5> <v-icon
             icon="mdi mdi-currency-inr"
             size="x-small">
            </v-icon>{{total}} </h5>
</div>
<div class="d-flex justify-content-center">
  <v-btn class="mt-3 w-50 text-white"  color="green-darken-4" @click="submit">Get Tickets</v-btn>
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
      tax: this.$store.getters.getTax || [],
      quantityAdult: this.$store.getters.getDetails.adult || 0,
      quantityChild: this.$store.getters.getDetails.child || 0,
      quantitySnr: this.$store.getters.getDetails.senior || 0,
      name: this.$store.getters.getDetails.name || '',
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

        if (valid && this.total !== 0 && this.$store.getters.getCategory!== null) 
        { if(this.quantityAdult === 0 && this.quantityChild >0 ) 
          {
            alert('Atleast one adult must be present.') 
          }
          else 
          {console.log('tax',this.totalTax)
          const details = {
            cat: this.$store.getters.getCategory,
            date: this.$store.getters.getDate,
            bDate: this.$store.getters.getBdate,
            name: this.name,
            mobile: this.mobileNum,
            email: this.email,
            adult: this.quantityAdult,
            child: this.quantityChild,
            senior: this.quantitySnr,
            total: this.total,
            totalTax: this.totalTax
          };
          
          this.$store.commit('setDetails', details)
          const amd = this.$store.getters.getDetails;
          console.log(amd);
           this.$router.push('/review-details')
          }
        } else {
          alert('Fields should not be empty')
        }
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
      incrementSnr() {
        this.quantitySnr += 1
      },
      decrementSnr() {
        if(this.quantitySnr === 0)
          {
          this.quantitySnr = 0;
          }
          else {
          this.quantitySnr -= 1;
          }
      },
    },
    computed: {
      ...mapGetters(['getMobile']),
      total() {
        if (this.pub && this.pub.length >= 2) {
          return this.quantityAdult * this.pub[0].price + this.quantityChild * this.pub[1].price + this.quantitySnr * this.pub[2].price;
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
      mobileNum: {
        get(){
          return this.getMobile;
        },
        set(value) {
      this.$store.commit('setMobile', value); 
      },
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