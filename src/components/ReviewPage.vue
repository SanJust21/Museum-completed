<template>
  <div class="d-flex  align-items-center justify-content-center my-5 flex-wrap mx-5 bg-secondary-subtle py-2">
    <div class="card main px-0 bg-white my-4 me-md-5">
      <div class=" text-center py-1 mb-3 fs-4 mx-0 px-0 card-header" style="background-color: #1B5E20; color: white;">   <!-- to take the full width -->
        ORDER SUMMARY
      </div>
      <div class="container px-lg-5 px-4 details">
        <div class="row">
            <h6 class="col-sm-4 col-3">Category</h6>
            <h6 class="col-sm-1 col-1">:</h6>
            <h6 h6 class="col-sm-6 col-2">{{ details.cat }}</h6>
        </div>
        <div class="row">
            <h6 class="col-sm-4 col-3">{{details.cat === 'institution' ? 'Name of Institution': 'Name'}}</h6>
            <h6 class="col-sm-1 col-1">:</h6>
            <h6 class="col-sm-6 col-3">{{ details.name }}</h6>
        </div>
        <div class="row" v-if="details.district">
            <h6 class="col-sm-4 col-3">District</h6>
            <h6 class="col-sm-1 col-1">:</h6>
            <h6 class="col-sm-6 col-3">{{ details.district }}</h6>
        </div>
        <div class="row">
            <h6 class="col-sm-4 col-3">Email</h6>
            <h6 class="col-sm-1 col-1">:</h6>
            <h6 class="col-sm-6 col-3">{{ details.email }}</h6>
        </div>
        <div class="row">
            <h6 class="col-sm-4 col-3">Mobile number</h6>
            <h6 class="col-sm-1 col-1">:</h6>
            <h6 class="col-sm-6 col-3">{{ details.mobile }}</h6>
        </div>
        <div class="row">
            <h6 class="col-sm-4 col-3">Visit date</h6>
            <h6 class="col-sm-1 col-1">:</h6>
            <h6 class="col-sm-6 col-3">{{ details.date }}, {{day}}</h6>
        </div>
        <div class="row">
            <h6 class="col-sm-4 col-3">No. of {{details.cat === 'institution' ? 'teachers': 'adults'}}</h6>
            <h6 class="col-sm-1 col-1">:</h6>
            <h6 class="col-sm-6 col-3">{{ details.adult }}</h6>
        </div>
        <div class="row">
            <h6 class="col-sm-4 col-3">No. of {{details.cat === 'institution' ? 'students': 'children'}}</h6>
            <h6 class="col-sm-1 col-1">:</h6>
            <h6 class="col-sm-6 col-3">{{ details.child }}</h6>
        </div>
        <div class="row" v-if="details.cat === 'public'">
            <h6 class="col-sm-4 col-3">No. of Senior Citizens</h6>
            <h6 class="col-sm-1 col-1">:</h6>
            <h6 class="col-sm-6 col-3">{{ details.child }}</h6>
        </div>
        <hr>
        <div>
          <h5 class="mt-2 mb-1 text-end ">Sub Total : Rs.{{ details.total }}/-</h5>
          <!-- <p class="text-end mb-0">GST ({{ tax[0].price }}%) : Rs.{{ details.totalTax }}/-</p> -->
          <!-- <h5 class="mt-1 text-end">Grand Total : Rs.{{ details.total + details.totalTax }}/-</h5> -->
          <!-- <div class="terms">
            <hr>
            <p>Ticket is Valid for the selected date it is purchased.</p> 
            <p>Tickets are<b> non-cancellable </b> and <b>non-refundable.</b></p>
            <p>Visitors are excepted to arrive atleast half an hour before closing time.</p>
          </div> -->
          <div class="d-flex justify-content-end ">
            <v-btn class="mt-4 w-25 mb-5 text-white" color="green-darken-4" @click="editDetails">Edit</v-btn></div>
          </div>
        </div>  
      </div>  
      <div div class="card mb-3" style="width: 350px; box-shadow: 5px 8px 5px 8px #7c76760e;">
        <div class=" text-center card-header" style="background-color: #1B5E20; color: white;">   <!-- to take the full width -->
          PAYMENT DETAILS
        </div>
        <div class="mx-2">
        <p class="mt-2 mb-1">Ticket Price : Rs.{{ details.total }}/-</p>
        <div v-for="amt in tax" :key="amt.type">
          <p class="mb-0">{{ amt.type }} ({{ amt.type === 'GST' || amt.type === 'IGST'? (amt.price + '%') : ('Rs.' + amt.price) }}) : Rs.{{ amt.type === 'GST' || amt.type === 'IGST'? amt.price.toFixed(2)* 0.01 * details.total : amt.price }}/-</p>
        </div>
          <h5 class="mt-1 text-end">Grand Total : Rs.{{grandTotal }}/-</h5></div>
          <div class="d-flex justify-content-end ">
            <v-btn class="my-2 w-25 text-white me-4" color="green-darken-4" @click="pay">Pay</v-btn>
          </div>
        <div class="terms mb-3 mx-2 text-dark">
            <hr>
            <ul>
              <li><p>Ticket is Valid for the selected date it is purchased.</p> </li>
              <li><p>Tickets are<b> non-cancellable </b> and <b>non-refundable.</b></p></li>
                <li><p>Visitors are excepted to arrive atleast half an hour before closing time.</p></li>
            </ul>
            
          </div>
      </div>    
  </div>
  <div v-if="payon">
    <RazorPayment/>
  </div>
</template>

<script>
import RazorPayment from './RazorPayment.vue';
import axios from 'axios';
export default {
  data() {
    return{
     payon: false
    }
  },

  components: {
    RazorPayment
  },
  methods: {
    async pay(){
      try{
        if(this.details.cat === "institution") { 
          const response = await axios.post('http://localhost:8080/api/details/submit', {
           "type": this.details.cat,
           "institutionName": this.details.name,
            "mobileNumber": this.details.mobile,
            "bookDate" : this.details.bDate,
           "email": this.details.email,
           "district": this.details.district,
           "numberOfTeachers": this.details.adult,
           "numberOfStudents": this.details.child,
           "visitDate": this.details.date,
           "totalPrice": this.grandTotal,
           "sessionId": this.session.Details,
          });
          if (response.status === 200) {
            const amount = response.data.amount;
            if(window.confirm('Are you sure you want to continue to pay'))
            {
              console.log('backend api to razorpay')
              try{
               const response1 = await axios.post(`http://localhost:8080/api/payment/create-order`, {
                 "amount": amount,
                 "sessionId": this.session.Details
               });
                if (response1.status === 200) {
                  this.$store.commit('setRazor', response1.data)
                  this.payon = true;
                }
              }
              catch(error) {
                console.error(error)
              }
            }
          } 
        }
        else {
          if(this.details.cat === "public"){
            const response = await axios.post('http://localhost:8080/api/details/submit', {
              "type": this.details.cat,
              "name": this.details.name,
              "mobileNumber": this.details.mobile,
              "email": this.details.email,
              "bookDate" : this.details.bDate,
              "numberOfAdults": this.details.adult,
              "numberOfChildren": this.details.child,
              "numberOfSeniors" : this.details.senior,
              "visitDate": this.details.date,
              "sessionId": this.session.Details,
              "totalPrice":this.grandTotal
            }); 
            if (response.status === 200) {
            const amount = response.data.amount;
            if(window.confirm('Are you sure you want to continue to pay'))
            {
              console.log('backend api to razorpay')
              try{
                  const response1 = await axios.post(`http://localhost:8080/api/payment/create-order`, {
                    "amount": amount,
                    "sessionId": this.session.Details
                  });
                  if (response1.status === 200) {
                    console.log('razorpay response from backend',response1.data)
                    this.$store.commit('setRazor', response1.data)
                    this.payon = true;
                  }
              }
              catch(error) {
                  console.error(error)
              }
            }
          }
          } 
          else {
            const response = await axios.post('http://localhost:8080/api/details/submit', {
              "type": this.details.cat,
              "name": this.details.name,
              "mobileNumber": this.details.mobile,
              "email": this.details.email,
              "bookDate" : this.details.bDate,
              "numberOfAdults": this.details.adult,
              "numberOfChildren": this.details.child,
              "visitDate": this.details.date,
              "sessionId": this.session.Details,
              "totalPrice": this.grandTotal
            });
              if (response.status === 200) {
                const amount = response.data.amount;
                if(window.confirm('Are you sure you want to continue to pay'))
                {
                  console.log('backend api to razorpay')
                  try{
                    const response1 = await axios.post(`http://localhost:8080/api/payment/create-order`, {
                      "amount": amount,
                      "sessionId": this.session.Details
                    });
                    if (response1.status === 200) {
                      console.log('razorpay response from backend',response1.data)
                      this.$store.commit('setRazor', response1.data)
                      this.payon = true;
                    }
                  }
                  catch(error) {
                    console.error(error)
                  }
              }
            }
          }
        }
      }
      catch(error){
        alert('Error fetching user details', error);
      }
    },
  },
  computed: {
    details(){
        return this.$store.getters.getDetails
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
    } ,
    grandTotal(){
      return Math.round(parseFloat(this.details.total) + parseFloat(this.details.totalTax))
    }
  }
};
</script>
<style scoped>
.terms p {
    font-size: 12px;
    margin: 0;
}
.main {
    box-shadow: 5px 8px 5px 8px #7c76760e;
    width: 600px
}
.details h6{
    font-size: 16px;
}
@media screen and (max-width: 750px) {
.main{
    width: 82% !important;
}
.main h6{
    padding-left: 0;
    font-size: 11px;
}
.terms h5{
    font-size: 13px;
}
.terms>p {
    font-size: 8px;
}

}
</style>
