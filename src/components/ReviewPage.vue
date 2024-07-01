<template>
  <div class="d-flex align-items-center justify-content-center my-5 flex-wrap mx-lg-5 bg-body-tertiary py-2"
    v-if="!payon">
    <div class="card main px-0 bg-white my-4 me-md-5 pb-4">
      <div class="text-center py-1 mb-3 fs-4 mx-0 px-0 card-header" style="background-color: #33691E; color: white;">
        ORDER SUMMARY
      </div>
      <div class="container px-lg-5 px-4 pe-2 details">
        <div class="d-flex justify-content-end" v-if="!disable">
          <v-icon class="edit mdi mdi-pencil" color="#388E3C" @click="editPage"></v-icon>
        </div>
        <div class="row">
          <h6 class="col-sm-5 col-xs-4 col">Category</h6>
          <h6 class="col-sm-1 col-1">:</h6>
          <h6 class="col-sm-6 col-xs-7 col data">{{ details.cat }}</h6>
        </div>
        <div class="row">
          <h6 class="col-sm-5 col-xs-4 col">Slot</h6>
          <h6 class="col-sm-1 col-1">:</h6>
          <h6 class="col-sm-6 col-xs-7 col data text-lowercase">{{ formatTime(details.slot) }}</h6>
        </div>
        <div class="row">
          <h6 class="col-sm-5 col-xs-4 col">{{ details.cat === 'institution' ? 'Name of Institution' : 'Name' }}</h6>
          <h6 class="col-sm-1 col-1">:</h6>
          <h6 class="col-sm-6 col-xs-7 col data">{{ details.name }}</h6>
        </div>
        <div class="row" v-if="details.district">
          <h6 class="col-sm-5 col-xs-4 col">District</h6>
          <h6 class="col-sm-1 col-1">:</h6>
          <h6 class="col-sm-6 col-xs-7 col data">{{ details.district }}</h6>
        </div>
        <div class="row">
          <h6 class="col-sm-5 col-xs-4 col">Email</h6>
          <h6 class="col-sm-1 col-1">:</h6>
          <h6 class="col-sm-6 col-xs-7 col" style="font-weight:400;">{{ details.email }}</h6>
        </div>
        <div class="row">
          <h6 class="col-sm-5 col-xs-4 col">Mobile Number</h6>
          <h6 class="col-sm-1 col-1">:</h6>
          <h6 class="col-sm-6 col-xs-7 col data">{{ details.mobile }}</h6>
        </div>
        <div class="row">
          <h6 class="col-sm-5 col-xs-4 col">Visit Date</h6>
          <h6 class="col-sm-1 col-1">:</h6>
          <h6 class="col-sm-6 col-xs-7 col data">{{ details.date }}, {{ day }}</h6>
        </div>
        <div class="row">
          <h6 class="col-sm-5 col-xs-4 col">No. of {{ details.cat === 'institution' ? 'Teachers' : 'Adults' }}</h6>
          <h6 class="col-sm-1 col-1">:</h6>
          <h6 class="col-sm-6 col-xs-7 col data">{{ details.adult }}</h6>
        </div>
        <div class="row">
          <h6 class="col-sm-5 col-xs-4 col">No. of {{ details.cat === 'institution' ? 'Students' : 'Children' }}</h6>
          <h6 class="col-sm-1 col-1">:</h6>
          <h6 class="col-sm-6 col-xs-7 col data">{{ details.child }}</h6>
        </div>
        <div class="row" v-if="details.cat === 'public'">
          <h6 class="col-sm-5 col-xs-4 col">No. of Senior Citizens</h6>
          <h6 class="col-sm-1 col-1">:</h6>
          <h6 class="col-sm-6 col-xs-7 col data">{{ details.senior }}</h6>
        </div>
        <hr>
        <div class="d-flex justify-content-between">
          <h5 class="mt-2 mb-1 text-end" style="color: #212121;">Sub Total : Rs.{{ details.total }}/-</h5>
          <v-btn class="my-2 text-white" color="green-darken-4" @click="pay" v-if="!disable" size="small">Submit</v-btn>
        </div>
      </div>
    </div>
    <div class="card mb-3 mx-lg-0 mx-4" :class="{ 'disabled-card': !disablePay }"
      style="width: 350px; max-width:320px; box-shadow: 5px 8px 5px 8px #7c76760e;">
      <div class="text-center card-header" style="background-color: #33691E; color: white;">
        PAYMENT DETAILS
      </div>
      <div class="mx-4" :disabled="!disablePay">
        <p class="mt-2 mb-1" style="font-size: 18px;">Ticket Price : Rs.{{ details.total }}/-</p>
        <div v-for="amt in tax" :key="amt.type">
          <p class="mb-0" style="font-size: 14px;">{{ amt.type }} ({{ amt.type === 'GST' || amt.type === 'IGST' ?
            (amt.price + '%') : ('Rs.' + amt.price) }}) : Rs.{{ amt.type === 'GST' || amt.type === 'IGST' ? (amt.price *
            0.01 * details.total).toFixed(2) : amt.price }}/-</p>
        </div>
        <h5 class="mt-1 text-end" style="color: #212121;">Grand Total : Rs.{{ grandTotal }}/-</h5>
      </div>
      <div class="d-flex justify-content-end">
        <v-btn class="my-2 w-25 text-white me-4" color="green-darken-4" @click="dialogConfirm = true"
          :disabled="!disablePay" size="small">Pay</v-btn>
      </div>
      <div class="terms mb-3 mx-2 text-dark">
        <hr>
        <ul>
          <li>
            <p>Ticket is Valid for the selected date it is purchased.</p>
          </li>
          <li>
            <p>Tickets are <b>non-cancellable</b> and <b>non-refundable.</b></p>
          </li>
          <li>
            <p>Visitors are excepted to arrive at least half an hour before closing time.</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div v-else style="height: 100vh;">
    <RazorPayment />
  </div>
  <v-dialog width="400" max-width="320" v-model="dialogConfirm">
    <v-card class="rounded-2" width="400" max-width="320">
      <v-card-title class="bg-green-darken-2">
        Confirm Payment
      </v-card-title>
      <v-card-text>
        Are you sure you want to proceed to payment?
      </v-card-text>
      <v-card-actions class="d-block mx-2">
        <v-btn color="#388E3C" @click="confirm" block variant="elevated" :disabled="confirmPay" :loading="confirmPay">Yes</v-btn>
        <v-btn @click="dialogConfirm = !dialogConfirm; disable = false;" block>Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-snackbar v-model="snackbar" :color="color" location="center" multi-line max-width="500" min-width="300">
    {{ message }}
    <template v-slot:actions>
      <v-btn color="black" variant="text" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import RazorPayment from './RazorPayment.vue';

export default {
  data() {
    return {
      payon: false,
      url: this.$store.getters.getUrl,
      disable: false,
      disablePay: false,
      amount: null,
      dialogConfirm: false,
      message: '',
      color: 'green',
      snackbar: false,
      paymentEnabled: false, // new data property
      uniqueID: '',
      confirmPay: false
    }
  },

  components: {
    RazorPayment
  },
  
  methods: {
    editPage() {
      this.$router.push('/booking-page')
    },
    formatTime(timeString) {
      const [hours, minutes] = timeString.split(':');
      let hoursInt = parseInt(hours, 10);
      const ampm = hoursInt >= 12 ? 'pm' : 'am';
      hoursInt = hoursInt % 12;
      hoursInt = hoursInt ? hoursInt : 12; // Handle midnight (0 hours)
      return `${hoursInt}:${minutes} ${ampm}`;
    },
    async pay() {
      this.disable = true;
      console.log('session', this.session.Details)
      try {
            const res = await this.$store.dispatch('lockSlot', {
            capacity: this.details.capacity,
            date: this.details.date,
            slot: this.details.slot,
            cat: this.details.cat
          })
            if (res) {
              try {
                if (this.details.cat === "institution") {
                  const payload = {
                    "type": this.details.cat,
                    "bookingId": this.bookingId,
                    "institutionName": this.details.name,
                    "mobileNumber": this.details.mobile,
                    "bookDate": this.details.bDate,
                    "email": this.details.email,
                    "district": this.details.district,
                    "numberOfTeachers": this.details.adult,
                    "numberOfStudents": this.details.child,
                    "visitDate": this.details.date,
                    "totalPrice": this.grandTotal,
                    "sessionId": this.session.Details,
                  };
                  const response = await this.$store.dispatch('submitDetails', payload);
                  if (response) {
                    this.amount = response.amount;
                    this.uniqueID = response.id;
                    // this.dialogConfirm = true;
                    this.disablePay = true; // Enable payment card
                  }
                } else {
                  if (this.details.cat === "public") {
                    // console.log('entered')
                    const payload = {
                      "type": this.details.cat,
                      "bookingId": this.bookingId,
                      "name": this.details.name,
                      "mobileNumber": this.details.mobile,
                      "email": this.details.email,
                      "bookDate": this.details.bDate,
                      "numberOfAdults": this.details.adult,
                      "numberOfChildren": this.details.child,
                      "numberOfSeniors": this.details.senior,
                      "visitDate": this.details.date,
                      "sessionId": this.session.Details,
                      "totalPrice": this.grandTotal
                    };
                    const response = await this.$store.dispatch('submitDetails', payload);
                    if (response) {
                      this.amount = response.amount;
                      this.uniqueID = response.id;
                      // this.dialogConfirm = true;
                      this.disablePay = true; // Enable payment card
                    }
                  } else {
                    const payload = {
                      "type": this.details.cat,
                      "bookingId": this.bookingId,
                      "name": this.details.name,
                      "mobileNumber": this.details.mobile,
                      "email": this.details.email,
                      "bookDate": this.details.bDate,
                      "numberOfAdults": this.details.adult,
                      "numberOfChildren": this.details.child,
                      "visitDate": this.details.date,
                      "sessionId": this.session.Details,
                      "totalPrice": this.grandTotal
                    };
                    const response = await this.$store.dispatch('submitDetails', payload);
                    if (response) {
                      this.amount = response.amount;
                      this.uniqueID = response.id;
                      // this.dialogConfirm = true;
                      this.disablePay = true; // Enable payment card
                    }
                  }
                }
              }
              catch (error) {
                this.disablePay = false;
                console.log(error)
                this.disable = false;
                alert('Sorry something went wrong! Please check the entered details or try again later.', error);
              }
          } 
      }
      catch (error) {
        this.disable = false;
        this.message = 'Capacity limit exceeded! Please select another slot or try again later!'
        this.color = 'red';
        this.snackbar = true;
      }
      
    },
    async confirm() {
      this.disablePay = true;
      this.confirmPay = true;
      try {
        const payload1 = {
          "amount": this.amount,
          "sessionId": this.session.Details,
          "uniqueId" : this.uniqueID
        }
        console.log(payload1)
        const response1 = await this.$store.dispatch("createOrder", payload1);
        if (response1) {
          this.confirmPay = false;
          this.disable = false;
          this.payon = true;
          this.dialogConfirm = false;
        }
      }
      catch (error) {
        this.disable = false;
        this.confirmPay = false;
        this.message = 'Something went wrong. Please try again later.';
        this.color = 'red';
        this.snackbar = true;
      }
    }
  },
  computed: {
    // capacity() {
    //   return parseInt(this.details.adult) + parseInt(this.details.adult) + parseInt(this.quantitySnr);
    // },
    bookingId() {
      return this.$store.getters.getCapacityId
    },
    details() {
      return this.$store.getters.getDetails;
    },
    day() {
      const dateObject = new Date(this.details.date);
      const options = { weekday: 'long' };
      const dayOfWeek = dateObject.toLocaleDateString('en-US', options);
      return dayOfWeek;
    },
    session() {
      return this.$store.getters.getsession;
    },
    tax() {
      return this.$store.getters.getTax
    },
    grandTotal() {
      return Math.round(parseFloat(this.details.total) + parseFloat(this.details.totalTax))
    }
  }
};
</script>

<style scoped>
.disabled-card {
  opacity: 0.5;
  pointer-events: none;
}

.terms p {
  font-size: 12px;
  margin: 0;
}

.main {
  box-shadow: 5px 8px 5px 8px #7c76760e;
  width: 700px;
}

.details h6 {
  font-size: 16px;
}

.details .data {
  text-transform: capitalize;
  font-weight: 400;
}

@media screen and (max-width: 750px) {
  .main {
    width: 90% !important;
  }

  .main h6 {
    padding-left: 0;
    font-size: 11px;
  }

  .terms h5 {
    font-size: 13px;
  }

  .terms > p {
    font-size: 8px;
  }

  .amt {
    font-size: 12px;
  }
}
</style>
