<template>
    <div class="container main my-5 w-50 px-0">
    
       <div class=" text-center py-1 mb-3 fs-4 mx-0 px-0" style="background-color: #74a965;">   <!-- to take the full width -->
            ORDER SUMMARY
        </div>
    
        <div class="container px-lg-5 px-4 details">
            <div class="row">
                <h6 class="col-sm-4 col-3">Category</h6>
                <h6 class="col-sm-2 col-1">:</h6>
                <h6 h6 class="col-sm-4 col-3">{{ details.cat }}</h6>
            </div>
            <div class="row">
                <h6 class="col-sm-4 col-3">{{details.cat === 'institution' ? 'Name of Institution': 'Name'}}</h6>
                <h6 class="col-sm-2 col-1">:</h6>
                <h6 class="col-sm-4 col-3">{{ details.name }}</h6>
            </div>
            <div class="row" v-if="details.district">
                <h6 class="col-sm-4 col-3">District</h6>
                <h6 class="col-sm-2 col-1">:</h6>
                <h6 class="col-sm-4 col-3">{{ details.district }}</h6>
            </div>
            <div class="row">
                <h6 class="col-sm-4 col-3">Email</h6>
                <h6 class="col-sm-2 col-1">:</h6>
                <h6 class="col-sm-4 col-3">{{ details.email }}</h6>
            </div>
            <div class="row">
                <h6 class="col-sm-4 col-3">Mobile number</h6>
                <h6 class="col-sm-2 col-1">:</h6>
                <h6 class="col-sm-4 col-3">{{ details.mobile }}</h6>
            </div>
            <div class="row">
                <h6 class="col-sm-4 col-3">Visit date</h6>
                <h6 class="col-sm-2 col-1">:</h6>
                <h6 class="col-sm-4 col-3">{{ details.date }}, {{day}}</h6>
            </div>
            <div class="row">
                <h6 class="col-sm-4 col-3">No. of {{details.cat === 'institution' ? 'teachers': 'adults'}}</h6>
                <h6 class="col-sm-2 col-1">:</h6>
                <h6 class="col-sm-4 col-3">{{ details.adult }}</h6>
            </div>
            <div class="row">
                <h6 class="col-sm-4 col-3">No. of {{details.cat === 'institution' ? 'students': 'children'}}</h6>
                <h6 class="col-sm-2 col-1">:</h6>
                <h6 class="col-sm-4 col-3">{{ details.child }}</h6>
            </div>
            <hr>
           <div class="terms">
            <h5 class="mt-2 text-end">Grand Total : Rs.{{ details.total }}</h5>
            <div class="terms">
            <hr>
   <p>Ticket is Valid for the selected date it is purchased.</p> 
   <p>Tickets are<b> non-cancellable </b> and <b>non-refundable.</b></p>
   <p>Visitors are excepted to arrive atleast half an hour before closing time.</p>
           </div>
           <div class="d-flex justify-content-end ">
           
           <v-btn class="mt-4 w-25 mb-5"  @click="pay">Pay</v-btn></div>
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
            "email": this.details.email,
            "district": this.details.district,
            "numberOfTeachers": this.details.adult,
            "numberOfStudents": this.details.child,
            "visitDate": this.details.date,
            "totalPrice": this.details.total,
            "sessionId": this.session.Details,
           });
           if (response.status === 200) {
               //this.$store.commit('setDetails', response.data)

               if(window.confirm('Are you sure you want to continue to pay'))
               {
                   console.log('backend api to razorpay')
                   try{
                     const response1 = await axios.post(`http://localhost:8080/api/payment/create-order?amount=${this.details.total}&sessionId=${this.session.Details}`)
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
          const response = await axios.post('http://localhost:8080/api/details/submit', {
            "type": this.details.cat,
            "name": this.details.name,
            "mobileNumber": this.details.mobile,
            "email": this.details.email,
            "numberOfAdults": this.details.adult,
            "numberOfChildren": this.details.child,
            "visitDate": this.details.date,
            "sessionId": this.session.Details,
            "totalPrice": this.details.total
          });
          if (response.status === 200) {
            const amount = response.data.amount;
              if(window.confirm('Are you sure you want to continue to pay'))
              {
                console.log('backend api to razorpay')
                try{
                    const response1 = await axios.post(`http://localhost:8080/api/payment/create-order?amount=${amount}&sessionId=${this.session.Details}`)
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
    }
  }
};
</script>
<style scoped>
.terms>p {
    font-size: 11px;
    margin: 0;
    /* line-height:1px ; */
}
.main {
    box-shadow: 5px 8px 5px 8px #7c76760e;
}
.details h6{
    font-size: 14px;
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
"type": this.details.cat,
          "name": this.details.name,
          "mobileNumber": this.details.mobile,
          "email": this.details.email,
          "numberOfAdults": this.details.adult,
          "numberOfChildren": this.details.child,
          "visitDate": this.details.date,
          "totalPrice": this.details.total