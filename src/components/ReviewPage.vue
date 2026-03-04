<template>
  <v-responsive>
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
            <h6 class="col-sm-5 col-xs-4 col">Name</h6>
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

          <template v-for="type in ticketLineItems" :key="type.id">
            <div class="row" v-if="type.qty > 0">
              <h6 class="col-sm-5 col-xs-4 col">No. of {{ type.typeName }}</h6>
              <h6 class="col-sm-1 col-1">:</h6>
              <h6 class="col-sm-6 col-xs-7 col data">{{ type.qty }}</h6>
            </div>
          </template>

          <hr>
          <div class="d-flex justify-content-between">
            <h5 class="mt-2 mb-1 text-end" style="color: #212121;">Sub Total : Rs.{{ details.total }}/-</h5>
            <v-btn
              class="my-2 text-white"
              color="green-darken-4"
              @click="pay"
              v-if="!disable"
              size="small"
              :loading="disable"
              :disabled="disable"
            >
              Submit
            </v-btn>
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
            <p class="mb-0" style="font-size: 14px;">
              {{ amt.type }} ({{ amt.type === 'GST' || amt.type === 'IGST' ? (amt.price + '%') : ('Rs.' + amt.price) }})
              : Rs.{{ amt.type === 'GST' || amt.type === 'IGST' ? (amt.price * 0.01 * details.total).toFixed(2) : amt.price }} /-
            </p>
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
            <li><p>Ticket is Valid for the selected date it is purchased.</p></li>
            <li><p>Tickets are <b>non-cancellable</b> and <b>non-refundable.</b></p></li>
            <li><p>Visitors are expected to arrive at least half an hour before closing time.</p></li>
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
  </v-responsive>
</template>

<script>
import RazorPayment from './RazorPayment.vue';
import axios from 'axios';

export default {
  components: {
    RazorPayment
  },

  data() {
    return {
      payon: false,
      disable: false,
      disablePay: false,
      amount: null,
      dialogConfirm: false,
      message: '',
      color: 'green',
      snackbar: false,
      confirmPay: false,
      bookingResponse: null,
      paymentResponse: null
    };
  },

  computed: {
    bookingId() {
      return this.$store.getters.getCapacityId;
    },
    details() {
      return this.$store.getters.getDetails || {};
    },
    day() {
      if (!this.details.date) return '';
      const dateObject = new Date(this.details.date);
      const options = { weekday: 'long' };
      return dateObject.toLocaleDateString('en-US', options);
    },
    session() {
      return this.$store.getters.getsession || {};
    },
    tax() {
      return this.$store.getters.getTax || [];
    },
    grandTotal() {
      return Math.round(
        parseFloat(this.details.total || 0) + parseFloat(this.details.totalTax || 0)
      );
    },

    /**
     * Merges categoryTypes (from API) with quantities stored in Vuex.
     * Uses both typeId and id for lookup to handle key type mismatches.
     */
    ticketLineItems() {
      const types = this.details.categoryTypes || [];
      const quantities = this.details.quantities || {};
      return types.map(type => ({
        ...type,
        qty: quantities[String(type.typeId)] || quantities[type.typeId] ||
             quantities[String(type.id)]     || quantities[type.id] || 0
      }));
    },
  },

  methods: {
    editPage() {
      this.$router.push('/beta/booking-page');
    },

    formatTime(timeString) {
      if (!timeString) return '';
      const [hours, minutes] = timeString.split(':');
      let hoursInt = parseInt(hours, 10);
      const ampm = hoursInt >= 12 ? 'pm' : 'am';
      hoursInt = hoursInt % 12 || 12;
      return `${hoursInt}:${minutes} ${ampm}`;
    },

    /**
     * Builds the registration API payload dynamically using categoryTypes
     * returned by the API.
     *
     * TYPE_FIELD_MAP maps typeName (lowercase) → backend field names.
     * "Child/Student" is now explicitly handled as a combined type.
     *
     * ⚠️  Confirm with your backend what field names are expected for
     *     "Child/Student" — update childStudentTypeId / childStudent
     *     below if your backend uses different names.
     */
    buildRegistrationPayload() {
  const d = this.details;
  const types = d.categoryTypes || [];
  const quantities = d.quantities || {};

  const TYPE_FIELD_MAP = {
    'adult':         { countField: 'adult',   idField: 'adultTypeId'   },
    'child':         { countField: 'child',   idField: 'childTypeId'   },
    'child/student': { countField: 'child',   idField: 'childTypeId'   },
    'student':       { countField: 'student', idField: 'studentTypeId' }, // ✅ institution
    'teacher':       { countField: 'teacher', idField: 'teacherTypeId' }, // ✅ institution
  };

  const payload = {
    name:      d.name,
    phNumber:  d.mobile,
    emailId:   d.email,
    visitDate: d.date,
    slotId: d.slotId ?? 1,
  };

  if (d.district) {
    payload.district = d.district; // ✅ included for institution category
  }

  console.log('[buildRegistrationPayload] categoryTypes:', JSON.stringify(types));
  console.log('[buildRegistrationPayload] quantities:', JSON.stringify(quantities));

  types.forEach(type => {
    const qty = quantities[String(type.typeId)] || quantities[type.typeId] ||
                quantities[String(type.id)]     || quantities[type.id] || 0;

    if (qty <= 0) return;

    const key = (type.typeName || '').toLowerCase().trim();
    const fieldDef = TYPE_FIELD_MAP[key];

    if (fieldDef) {
      payload[fieldDef.idField]    = type.typeId ?? type.id;
      payload[fieldDef.countField] = qty;
    } else {
      console.warn(`[buildRegistrationPayload] No field mapping for typeName "${type.typeName}".`);
    }
  });

  console.log('[buildRegistrationPayload] final payload:', JSON.stringify(payload));
  return payload;
},

    async pay() {
      this.disable = true;

      try {
        const categoryId = this.details.categoryId;

        if (!categoryId) {
          throw new Error('Category ID is missing. Please go back and re-select your category.');
        }

        const apiPayload = this.buildRegistrationPayload();

        const regResponse = await axios.post(
          `${this.$store.getters.getUrl}/api/onlineBooking/onlineUserReg?category=${categoryId}`,
          apiPayload,
          { headers: { 'Content-Type': 'application/json' } }
        );

        if (regResponse.status === 200 && regResponse.data?.userData) {
          this.bookingResponse = regResponse.data.userData;
          this.amount   = regResponse.data.userData.grandTotal ||
                          regResponse.data.userData.totalAmount;
          this.uniqueID = regResponse.data.userData.sessionId || 'fallback-id';

          this.disablePay = true;
          this.showSnackbar('Booking registered successfully!', 'green');
          // ✅ disable stays true on success — Submit + Edit button both hidden
        } else {
          throw new Error('Registration failed - invalid response');
        }
      } catch (error) {
        console.error('Registration failed:', error);
        const errMsg = error.response?.data?.message ||
                      error.message ||
                      'Something went wrong during booking. Please try again.';
        this.showSnackbar(errMsg, 'red');
        this.disable = false; // ✅ only re-enable on failure so user can retry
      }
    },

    async confirm() {
      this.confirmPay = true;

      try {
        const categoryId = this.details.categoryId || this.bookingResponse?.categoryId;
        const sessionId  = this.bookingResponse?.sessionId;
        const payAmount  = Math.round(this.grandTotal);

        if (!categoryId) throw new Error('Category ID is missing.');
        if (!sessionId)  throw new Error('Session ID missing. Complete registration first.');

        // This action already commits setRazor internally
        await this.$store.dispatch('createOrder', { categoryId, sessionId, payAmount });

        this.dialogConfirm = false;
        this.payon = true;
      } catch (error) {
        const errMsg = error.response?.data?.message || error.message || 'Payment failed.';
        this.showSnackbar(errMsg, 'red');
        this.disablePay = false;
      } finally {
        this.confirmPay = false;
      }
    },

    showSnackbar(msg, color = 'red') {
      this.message = msg;
      this.color   = color;
      this.snackbar = true;
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
  .terms p {
    font-size: 8px;
  }
}
</style>