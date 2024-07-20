<template>
  <div class="d-flex justify-content-center px-md-5 flex-wrap py-3">
    <v-card flat class=" d-flex flex-column justify-content-center rounded-5 " max-width="500">
      <v-card-item>
        <v-card-title class="d-flex align-items-center justify-content-center">
          <h2 class="text-center mt-2 text-green-darken-3">Congratulation!</h2>
          <v-icon class="mdi mdi-party-popper ms-3" size="x-large" color="green-darken-3"></v-icon>
        </v-card-title>
        <v-card-text class="text-center">
          <h5 class="text-center ">You have successfully booked your tickets.</h5>
          <p>Get ready for an unforgettable experience at Aksharam Museum! Explore our latest exhibitions and
            immerse yourself in the history of language.</p>
          <h6 class="text-center text-danger my-0">Take a screenshot or download your QR ticket and remember to bring it
            along
            when you visit.</h6>
          <h5 class="text-center text-danger mb-0 mt-0">Thank You!!</h5>
        </v-card-text>
        <div class="d-flex justify-content-center mt-0" v-if="downloading">
          <v-btn size="small" class="mb-3 mt-0 me-2 text-white"  color="green-darken-4"
            @click="download">Download</v-btn>
          <v-btn size="small" class="mb-3 mt-0 me-2 text-white"  color="green-darken-4"
            @click="$router.push('/booking-page')">Book again</v-btn>
          <v-btn size="small" class="mb-3 mt-0 text-white"  color="green-darken-4"
            @click=" $router.push('/')">Home</v-btn>
        </div>
        <div v-else class="text-center">
          <h6>Your download will begin in <span class="text-primary fw-normal "><i>{{ resendCountdown }}
                seconds.</i></span></h6>
        </div>
      </v-card-item>
    </v-card>
    <div class="m-ticket mt-4 mb-5 border border-2 " ref="ticket">
      <div class="d-flex pt-2 pb-1 justify-content-center w-100 bg-grey-darken-4" style="background-color: #110b03;">
        <v-img src="@/assets/logo.png" class="me-1 flex-grow-0 " style="height:25px; width:35px"></v-img>
        <h5 class="text-center text-white">Aksharam Museum</h5>
      </div>
      <p class="m">Aksharam</p>
      <div class="movie-details d-flex flex-column align-items-center">
        <p>{{ adultsCount + childrenCount + seniorCount }} Ticket(s)</p>
        <p class="mb-0 mt-0">Date: {{ userDetails.Date }}</p>
        <p class="mb-0">Slot: {{ slotTime }}</p>
        <p class="mb-0">{{ userDetails.Teachers ? 'Teachers' : 'Adults' }}: {{ adultsCount }}</p>
        <p class="mb-0">{{ userDetails.Students ? 'Students' : 'Children' }}: {{ childrenCount }}</p>
        <p class="mb-0" v-if="userDetails.Seniors">Senior Citizens : {{ seniorCount }}</p>
      </div>
      <div class="info">
        <v-divider></v-divider>
      </div>
      <div class="ticket-details mt-1 d-flex flex-column align-items-center">
        <p class="m-0">{{ adultsCount + childrenCount + seniorCount }} Ticket(s)</p>
        <v-img id="qr-code" :src="'data:image/png;base64,' + qrdetails.qrCodeImage" alt="QR Code" class="scan"></v-img>
        <h6 class="pb-2">{{ userDetails["Booking ID"] }}</h6>
      </div>
      <p class="m m1">Aksharam</p>
      <div class="info-cancel bg-dark-subtle ">
        Cancellation not available
      </div>
      <div class="total-amount">
        <p>Total Amount:</p>
        <p>Rs.{{ userDetails.Amount }}/-</p>
      </div>
    </div>
  </div>
</template>
<script>
import html2pdf from 'html2pdf.js'
export default {
  data() {
    return {
      downloading: false,
      resendTimeout: null,
      resendCountdown: 5,
    };
  },
  methods: {
    startResendTimer() {
      const interval = setInterval(() => {
        if (this.resendCountdown > 0) {
          this.resendCountdown--;
        } else {
          clearInterval(interval); 
          this.download(); 
          this.downloading = true;
        }
      }, 1000);
    },
    download() {
      const ticketElement = this.$refs.ticket;
      ticketElement.style.margin = 'auto';
      ticketElement.style.display = 'block';
      const options = {
        margin: 30,
        filename: `aksharam_${this.userDetails["Booking ID"]}.pdf`,
        image: { type: 'png', quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: { format: 'A5', orientation: 'portrait' }
      };

      html2pdf().from(ticketElement).set(options).save();
    },
    formatTime(time) {
      const [hours, minutes] = time.split(':');
      let formattedHours = parseInt(hours, 10) % 12;
      formattedHours = formattedHours === 0 ? 12 : formattedHours;
      const formattedTime = `${formattedHours}:${minutes} ${hours < 12 ? 'am' : 'pm'}`;
      return formattedTime;
    }
  },
  mounted() {
    this.startResendTimer();

  },

computed: {
   qrdetails(){
     return this.$store.getters.getQR || {};
   },
 
  userDetails() {
    const userDetailsString = this.qrdetails.userDetails || '';
    const userDetailsArray = userDetailsString.split(', ');
    const userDetailsObject = {};
    userDetailsArray.forEach((detail) => {
      if (detail) {
        const [key, value] = detail.split(': ');
        userDetailsObject[key.trim()] = isNaN(value) ? value.trim() : parseFloat(value.trim());
      }
      });
  
      return userDetailsObject;
  },
  slotTime() {
    const slot = this.userDetails["Slot Name"] || '';
    const formattedSlot = this.formatTime(slot);
    return formattedSlot;
  },
    adultsCount() {
      return this.userDetails.Teachers || this.userDetails.Adults || 0;
    },
    childrenCount() {
      return this.userDetails.Students || this.userDetails.Children || 0;
    },
    seniorCount() {
      return this.userDetails.Seniors || 0;
    },
  }
}

</script>

<style scoped>
.m-ticket{
  width:280px;
  background:#fff;
  border-radius:12px;
  overflow:hidden;
  box-shadow:0 0 25px #bbb;
  display:flex;
  flex-direction:column;
  align-items:center;
  position:relative;
  cursor:pointer;
  width: clamp(260px, 80%, 280px);
}
.m-ticket:before{
  content:"";
  position:absolute;
  left:-10px;
  top:41%;
  background:#eee;
  box-shadow:inset 0 0 25px #bbb;
  width:17px;
  height:17px;
  border-radius:50%;
}
.m-ticket:after{
  content:"";
  position:absolute;
  right:-10px;
  top:41%;
  background:#eee;
  box-shadow:inset 0 0 25px #bbb;
  width:17px;
  height:17px;
  border-radius:50%;
}
.m{
  position:absolute;
  right:-5px;
  top:18%;
  transform:rotate(270.5deg);
  font-size:.80em;
  color:#888;
}
.m1{
  right:-5px;
  top:58%;
}
.m-ticket > .movie-details{
  padding:10px 20px; 
  font-size:.90em;
  line-height:19px;
  height: 140px;
}
.m-ticket > .movie-details> p{
  margin: 5px;
}
.m-ticket > .info{
  width:100%;
  background:transparent;
  text-align:justify;
  font-size:.72em;
}
.m-ticket > .ticket-details > .scan{
  width:100px;
  height:100px;
}
.m-ticket > .ticket-details > p{
  font-size:.90em;
  line-height:19px;
  color:#777;
}
.m-ticket > .info-cancel{
  width:100%;
  background:#eee;
  color:#888;
  padding:10px 0px;
  text-align:center;
  font-size:.80em;
}
.m-ticket > .total-amount{
  display:flex;
  justify-content:space-between;
  padding:12px 20px;
  font-weight:700;
  font-size:.90em;
  width:100%;
}

</style>