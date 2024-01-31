<template>
<div class="m-ticket my-5 mx-auto">
    <!-- <div class="info-cancel head"> -->
        <div class="d-flex pt-2 pb-1 justify-content-center w-100  " style="background-color: #110b03;">
    <v-img src="@/assets/logo.png" class="me-1 flex-grow-0 " style="height:25px; width:35px"></v-img>
    <h5 class="text-center text-white">Aksharam Museum</h5>
  </div>
  <!-- </div> -->
  
  <p class="m">Aksharam</p>
  <div class="movie-details d-flex flex-column align-items-center">
    <p >{{adultsCount + childrenCount}} Ticket(s)</p>
    <p class="mb-0">Date: {{qrdetails.userDetails.Date}}</p>
    <p class="mb-0">{{qrdetails.userDetails.Teachers?'Teachers':'Adults'}}: {{adultsCount}}</p>
    <p class="mb-0">{{qrdetails.userDetails.Students?'Students':'Children'}}: {{childrenCount}}</p>
     
  </div>
  <div class="info">
    -----------------------------------------------------------
  </div>
  <div class="ticket-details mt-1 d-flex flex-column align-items-center">
    <p class="m-0">{{adultsCount + childrenCount}} Ticket(s)</p>
    <!-- <qrcode-vue :value="qrCodeString" :size="size" level="H" class="my-2"/> -->
    <v-img id="qr-code" :src="'data:image/png;base64,'+ qrdetails.qrCodeImage" alt="QR Code" class="scan"></v-img>
    <!-- <v-img id="qr-code" :src="data:image/png;base64,"+ iVBORw0KGgoAAAANSUhEUgAAASwAAAEsAQAAAABRBrPYAAACTUlEQVR4Xu2WQW7lMAxDlZWPkZva8U1zhFlmZZWk8qetW6DdDAYRLASBIz9/wBRlf/PfxB+bM9/GwqZY2BQLm2JhUyxsin+BDWO0ax/lbO5HwXNufjJbcmEcnzVmAdvewWiJpjJhTFZt/zCrhUu4kOOEWLtsc++v0re8GDOoe4Hn9wOPJEqHuQq9d2lymLXvTf58zBiVmnx6mM2FRQxD3SmLX3tY/W+kwYbOZNw+7SLJvr4gBau/JcNwUlGHmEVTG3njO2RJgyFfeeGyi5uKPrSqFv5CJgzjfivAg2vwBLt9ng0zRjWS1WiAhqJr3DifCUOh91HYv1Vq4NOdZqifBHk+hnamySEINYEBjFKc7frS9Q/HXF0cdedUaKI/kBGZsE3b7zqiwYyCT7Q2zJAM4xSq36gMxYEU+DQ4IRcWJicgKWoJG9DwHwVJgLnzvHLUmtWnyZHCW2tTYdy47iCTGrB6eykTkQdTCx9kqQZWAXP1+OSQ52OnydUgK24lpKgJx8kw7B1ShL27x/0LG6DH7/soE6a9q9bGvq7GaHJFOox77zi7RA728mzyBFgk28Wzq9LtrLvfx1cqzHUHURBpUtXXVqjGkQsbxopv2L7B4XrDDCI3/UwaLGKo6O0CAx1o+yE1PBEGwG5vczaCJDO5MI7597ii1urojRjbPB2GTx5cjV/saMMpLTW6Mskw6YA3AD792o+XDZJh74Igo74GHGQiDC8KEj5/1R1rtSwTZgwWHfes3vEckyDPx36MhU2xsCkWNsXCpljYFP8HewPjnYgCthqF2QAAAABJRU5ErkJggg==" alt="QR Code" class="scan"></v-img> -->
    <!-- <img src="https://pngimg.com/uploads/qr_code/qr_code_PNG2.png" class="scan"> -->
    <!-- <h6>BOOKING ID: Tbafeq7</h6> -->
    <h6>{{ qrdetails.Payment_ID }}</h6>
  </div>
  <p class="m m1">Aksharam</p>
  <div class="info-cancel bg-dark-subtle ">
   Cancellation not available
  </div>
  <div class="total-amount">
    <p>Total Amount:</p>
    <p>Rs.{{ qrdetails.Amount }}/-</p>
    <!-- <p>Rs. 100/-</p> -->
  </div>
</div>

</template>
<script>
// import QrcodeVue from 'qrcode.vue'
export default {
  // components: {
  //   QrcodeVue,
  // },
  // mounted() {
  //   this.qrCodeString = JSON.stringify(this.details); // Convert object to JSON string
  // },
data(){
return{
    size: 120,
    // qrCodeString: '',
    // details: {teachers: 5, students:11, total:680, bookDate: '27-11-2024'},
    // string:'iVBORw0KGgoAAAANSUhEUgAAASwAAAEsAQAAAABRBrPYAAACTUlEQVR4Xu2WQW7lMAxDlZWPkZva8U1zhFlmZZWk8qetW6DdDAYRLASBIz9/wBRlf/PfxB+bM9/GwqZY2BQLm2JhUyxsin+BDWO0ax/lbO5HwXNufjJbcmEcnzVmAdvewWiJpjJhTFZt/zCrhUu4kOOEWLtsc++v0re8GDOoe4Hn9wOPJEqHuQq9d2lymLXvTf58zBiVmnx6mM2FRQxD3SmLX3tY/W+kwYbOZNw+7SLJvr4gBau/JcNwUlGHmEVTG3njO2RJgyFfeeGyi5uKPrSqFv5CJgzjfivAg2vwBLt9ng0zRjWS1WiAhqJr3DifCUOh91HYv1Vq4NOdZqifBHk+hnamySEINYEBjFKc7frS9Q/HXF0cdedUaKI/kBGZsE3b7zqiwYyCT7Q2zJAM4xSq36gMxYEU+DQ4IRcWJicgKWoJG9DwHwVJgLnzvHLUmtWnyZHCW2tTYdy47iCTGrB6eykTkQdTCx9kqQZWAXP1+OSQ52OnydUgK24lpKgJx8kw7B1ShL27x/0LG6DH7/soE6a9q9bGvq7GaHJFOox77zi7RA728mzyBFgk28Wzq9LtrLvfx1cqzHUHURBpUtXXVqjGkQsbxopv2L7B4XrDDCI3/UwaLGKo6O0CAx1o+yE1PBEGwG5vczaCJDO5MI7597ii1urojRjbPB2GTx5cjV/saMMpLTW6Mskw6YA3AD792o+XDZJh74Igo74GHGQiDC8KEj5/1R1rtSwTZgwWHfes3vEckyDPx36MhU2xsCkWNsXCpljYFP8HewPjnYgCthqF2QAAAABJRU5ErkJggg=='
}
},
computed: {
  qrdetails(){
    return this.$store.getters.getQR || {};
  },
//   details(){
//     return this.$store.getters.getDetails || {};
// },
adultsCount() {
      // Check if 'adults' key exists, if not, default to 0
      return this.qrdetails.userDetails.Teachers || this.qrdetails.userDetails.Adults || 0;
    },
    childrenCount() {
      // Check if 'child' key exists, if not, default to 0
      return this.qrdetails.userDetails.Students || this.qrdetails.userDetails.Children || 0;
    }
}
};
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