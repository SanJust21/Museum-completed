<template>
  <v-sheet width="450" max-width="320" class="mx-sm-auto">
    <v-form ref="form" class="p-3">
      <v-text-field v-model="name" density="comfortable" variant="underlined" label="Name*" :rules="nameRules"
        required></v-text-field>
      <v-text-field v-model="mobileNum" density="comfortable" variant="underlined" label="Mobile Number*"
        :rules="mobRules" required></v-text-field>
      <v-text-field v-model="email" density="comfortable" variant="underlined" :rules="emailRules" label="E-mail*"
        required></v-text-field>
      <div class="d-flex justify-content-between align-items-center mt-1 mb-2">
        <h6 class="mt-1">Adults (Rs.{{ pub.adult }}): </h6>
        <div class="input-group w-auto align-items-center">
          <input type="button" value="-" class="border icon-shape bg-light font-weight-bold fs-5"
            @click="updateQuantity('quantityAdult', 'decrement')">
          <input type="text" max="100" name="quantity" class=" border bg-light text-center icon-shape"
            v-model="quantityAdult">
          <input type="button" value="+" class="border icon-shape bg-light font-weight-bold fs-5"
            @click="updateQuantity('quantityAdult', 'increment')">
        </div>
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex flex-column mb-0">
          <h6 class="mb-0 mt-3">Children (Rs.{{ pub.child }}): </h6>
          <p class="lh-1 text-end mb-0" style="font-size:12px; font-style: italic;">( 5 to 12 years)</p>
        </div>
        <div class="input-group w-auto align-items-center">
          <input type="button" value="-" class="border icon-shape bg-light font-weight-bold fs-5"
            @click="updateQuantity('quantityChild', 'decrement')">
          <input type="text" max="100" name="quantity" class=" border bg-light text-center icon-shape"
            v-model="quantityChild">
          <input type="button" value="+" class="border icon-shape bg-light font-weight-bold fs-5"
            @click="updateQuantity('quantityChild', 'increment')">
        </div>
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex flex-column">
          <h6 class="mb-0 mt-3">Senior Citizens (Rs.{{ pub.senior }}): </h6>
          <p class="lh-1 text-end" style="font-size:12px; font-style: italic;">( above 65 years)</p>
        </div>
        <div class="input-group w-auto align-items-center pt-0">
          <input type="button" value="-" class="border icon-shape bg-light font-weight-bold fs-5"
            @click="updateQuantity('quantitySnr', 'decrement')">
          <input type="text" max="100" name="quantity" class=" border bg-light text-center icon-shape"
            v-model="quantitySnr">
          <input type="button" value="+" class="border icon-shape bg-light font-weight-bold fs-5"
            @click="updateQuantity('quantitySnr', 'increment')">
        </div>
      </div>
      <hr>
      <div class="d-flex justify-content-around my-0">
        <h5> Total </h5>
        <h5> : </h5>
        <h5> <v-icon icon="mdi mdi-currency-inr" size="x-small">
          </v-icon>{{total}} </h5>
      </div>
      <div class="d-flex justify-content-center">
        <v-btn class="mt-3 w-50 text-white" color="green-darken-4" @click="submit" :disabled="disabled"
          :loading="disabled">Get Tickets</v-btn>
      </div>
    </v-form>
  </v-sheet>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data() {
     return{
      pub:this.$store.getters.getPricing.public || [],
      tax: this.$store.getters.getTax || [],
      quantityAdult: this.$store.getters.getDetails.adult || 0,
      quantityChild: this.$store.getters.getDetails.child || 0,
      quantitySnr: this.$store.getters.getDetails.senior || 0,
      name: this.$store.getters.getDetails.name || '',
      disabled: false,
      message: '',
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
          if (this.quantityAdult === 0 && this.quantityChild > 0) 
          {
           this.message ='Atleast one adult must be present.'
          }
          else 
          {
           this.message = '';
           console.log('tax', this.totalTax)
           const details = {
            cat: this.$store.getters.getCategory,
            date: this.$store.getters.getDate,
            bDate: this.$store.getters.getBdate,
            slot: this.$store.getters.getCapacity,
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
            try {
              this.disabled = true;
            const res = await this.$store.dispatch('lockSlot', {
              capacity: this.capacity,
              date: details.date,
              slot: details.slot,
              cat: details.cat
            })
              if (res) {
                this.disabled = false;
              this.$router.push('/review-details')
            } 
          }
            catch (error) {
              this.disabled = false;
              console.error(error);
              
              this.message = 'Capacity not available'
              alert(this.message)
           }
          }
        } else {
          if (this.$store.getters.getCapacity === null) {
            this.disabled = false;
            this.message = 'Please select your visit time!';
          }
          else if (this.$store.getters.getCategory === null) {
            this.disabled = false;
            this.message = 'Please select your category';
          }
          else if (!valid) {
            this.disabled = false;
            this.message = 'Please fill the required fields';
          }
          this.disabled = false;
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
        if (this.pub) {
          return this.quantityAdult * this.pub.adult + this.quantityChild * this.pub.child + this.quantitySnr * this.pub.senior;
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
      },
      capacity() {
        return parseInt(this.quantityAdult) + parseInt(this.quantityChild) + parseInt(this.quantitySnr);
      },
  },
  watch: {
    quantityAdult(value) {
      if (value < 0 || value === '') {
        this.quantityAdult = 0;
      }
    },
    quantityChild(value) {
      if (value < 0 || value === '') {
        this.quantityChild = 0;
      }
    },
    quantitySnr(value) {
      if (value < 0 || value === '') {
        this.quantitySnr = 0;
      }
    }
  }
  };
</script>

<style scoped>
.icon-shape{
    width:2rem;
    height:2rem;
    border-radius: 10px;
}
</style>