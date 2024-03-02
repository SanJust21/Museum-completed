<template>
    <v-card
    class="mx-auto mt-0"
    max-width="600"
    hover
  >
    <v-card-item>
      <v-card-title>
        <h1 class="text-center text-dark my-1">Congratulations !! </h1>
      </v-card-title>
      <!-- <v-card-subtitle class="d-flex justify-content-center ">
        <v-icon class="mdi mdi-check-circle-outline text-success my-0"
        size="x-large"></v-icon>
      </v-card-subtitle> -->
    </v-card-item>

    <v-card-text>
      <h6 class="text-center text-danger my-0">Take a Screenshot of your QR ticket and remember to bring it along when you visit.</h6>
      <h5 class="text-center text-danger mb-0 mt-0">Thank You!!</h5>
    </v-card-text>
    <div class="d-flex justify-content-center mt-0">
      <v-btn 
    size="small"
    class="mb-3 mt-0 text-white"
    rounded="xl"
    color="green-darken-4"
    @click="$router.push('/')">Home</v-btn>
    </div>

  </v-card>
    <!-- <h3 class="text-center mt-4"></h3>
  
<p class="text-danger text-center">Take a Screenshot of your QR ticket and remember to bring it along when you visit.</p> -->
<!-- <hr class="mx-5"> -->
<div class="m-ticket mt-4 mb-5 mx-auto">
        <div class="d-flex pt-2 pb-1 justify-content-center w-100" style="background-color: #110b03;">
    <v-img src="@/assets/logo.png" class="me-1 flex-grow-0 " style="height:25px; width:35px"></v-img>
    <h5 class="text-center text-white">Aksharam Museum</h5>
  </div>

  
  <p class="m">Aksharam</p>
  <div class="movie-details d-flex flex-column align-items-center">
    <p >{{adultsCount + childrenCount}} Ticket(s)</p>
    <p class="mb-0 mt-0">Date: {{userDetails.Date}}</p>
    <p class="mb-0">{{userDetails.Teachers?'Teachers':'Adults'}}: {{adultsCount}}</p>
    <p class="mb-0">{{userDetails.Students?'Students':'Children'}}: {{childrenCount}}</p>
     
  </div>
  <div class="info">
    -----------------------------------------------------------
  </div>
  <div class="ticket-details mt-1 d-flex flex-column align-items-center">
    <p class="m-0">{{adultsCount + childrenCount}} Ticket(s)</p>
    <v-img id="qr-code" :src="'data:image/png;base64,'+ qrdetails.qrCodeImage" alt="QR Code" class="scan"></v-img>
    <!-- <h6>{{ qrdetails.Payment_ID }}</h6> -->
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
</template>
<script>

export default {

computed: {
   qrdetails(){
     return this.$store.getters.getQR || {};
   },
  
  userDetails() {
      // Parse userDetails string into an object
      const userDetailsString = this.qrdetails.userDetails || '';
      const userDetailsArray = userDetailsString.split(', ');
      const userDetailsObject = {};

      userDetailsArray.forEach((detail) => {
        const [key, value] = detail.split(': ');
        userDetailsObject[key.trim()] = isNaN(value) ? value.trim() : parseFloat(value.trim());
      });

      return userDetailsObject;
    },
    adultsCount() {
      // Check if 'Teachers' key exists, if not, default to 0
      return this.userDetails.Teachers || this.userDetails.Adults || 0;
    },
    childrenCount() {
      // Check if 'Students' key exists, if not, default to 0
      return this.userDetails.Students || this.userDetails.Children || 0;
    }
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