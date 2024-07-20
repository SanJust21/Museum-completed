<template>
  <!-- <v-row justify="center"> -->
  <v-dialog v-model="dialog" width="600" height="650">
    <template v-slot:activator="{ props }">
      <v-btn color="#74a965" class=" book container fs-md-5 py-2 button-style"
        v-bind="props">Book
        <span class="ms-1">Now</span></v-btn>
    </template>
    <v-card width="auto" height="450">
      <v-card-title class="bg-success-subtle">
        <span class="text-h5 ">Terms and Conditions</span>
      </v-card-title>
      <v-card-text class="pb-0 ">
        <ul class="mt-md-3 mt-2 p-md-2 pb-md-0 px-2">
          <li>Museum Hours : <b>10:00 AM</b> to <b>5:00 PM</b>.</li>
          <li>Closed on <b>Mondays</b> and <b> Hoildays</b>.</li>
          <li>Ticket Rates :
            <ul class="rate">
              <li> Public : Adult - <b>Rs. {{ pub.adult? pub.adult : 'N/A' }}</b>/- , Children - <b>Rs. {{ pub.child?
                  pub.child:'N/A'}}</b>/-, Senior Citizen - <b>Rs. {{ pub.senior? pub.senior: 'N/A' }}</b>/-</li>
              <li> Institution : Teacher - <b>Rs. {{ institute.teacher ? institute.teacher :'N/A'}}</b>/- , Student -
                <b> Rs. {{ institute.student ? institute.student :'N/A'}}</b>/-
              </li>
              <li> Foreigner : Adult - <b>Rs.{{ foreigner.foreign_adult ? foreigner.foreign_adult: 'N/A' }}</b>/- ,
                Children -
                <b>Rs. {{foreigner.foreign_child ? foreigner.foreign_child : 'N/A'}}</b>/-
              </li>
            </ul>
          </li>
          <li>Visitors are excepted to arrive atleast half an hour before closing time. </li>
          <li>Visitors should not damage/alter/vandalise the property of Aksharam Museum.</li>
          <li><b>GST</b> is applicable.</li>
          <li>Tickets are<b> non-cancellable </b> and <b>non-refundable.</b></li>
        </ul>
      </v-card-text>
      <v-card-actions class=" py-0 my-0 mb-3">

        <v-btn color="green-darken-1" variant="text" class="bg-white" @click="dialog = false">
          Disagree
        </v-btn>
        <v-btn color="green-darken-1" variant="text" class="bg-white" @click="dialog2 = true; dialog= !dialog;">
          Agree
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!-- </v-row> -->

  <v-dialog v-model="dialog2" persistent class="py-8 px-6 text-center mx-auto ma-4" elevation="2" max-width="400"
    width="100%" height="550">
    <template v-slot:default="{ isActive }">
      <v-card-actions class="justify-end">
        <v-icon class="mdi mdi-close-circle-outline text-white fs-3" @click="isActive.value = false, $router.push('/')">
        </v-icon>
      </v-card-actions>
      <v-card class="py-8 px-6 text-center mx-auto " elevation="2" max-width="400" width="100%" height="450">
        <v-card-text>
          <router-view></router-view>
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>
<script>
  export default {
    data () {
      return {
        dialog: false,
        dialog2: false
      }
    },
  computed: {
      pub() {
      // return this.$store.getters.getPublic
      return this.$store.getters.getPricing.public || {};
      },
      institute() {
        // return this.$store.getters.getInstitute
        return this.$store.getters.getPricing.institution || {};
      },
      foreigner() {
        // return this.$store.getters.getForeign
        return this.$store.getters.getPricing.foreigner || {};
    },
    buttonSize() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return "x-small";
      } else {
        return "default"; // Or whatever size you prefer for larger screens
      }
    }
    }
  }
</script>

<style scoped>
.book{
  width: fit-content;
  height: fit-content;
  background-color: #E53935 !important;
}
.book:hover {
  transform: scale(1.1);
}
.button-style{
  padding-inline:16px;
  height: 40px;
  font-size: 1.1rem;
}
.rate>li { 
  letter-spacing: -1px;
}
 @media screen and (max-width: 500px){
  .button-style {
      padding-inline: 12px;
      height: 40px;
      font-size: 1.1rem;
    }
 }
  @media screen and (max-width: 500px) {
    .button-style {
      padding-inline: 7px;
      height: 35px;
      font-size: 0.8rem;
    }
  }
  @media screen and (max-width: 333px) {
    .button-style {
      padding-inline: 6px;
      height: 30px;
      font-size: 0.6rem;
    }
  }
</style>