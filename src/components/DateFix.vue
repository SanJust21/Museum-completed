<template>
  <!-- <div class=" d-flex flex-column mx-5 mt-5 mb-4 flex-wrap mx-auto" style="height: 600px; width:fit-content"> -->
    <div class="d-flex justify-content-center mx-5 mt-5 mb-4 flex-wrap mx-auto">
  <div>
    <!-- <div class="d-flex mb-2 justify-content-start mx-5">
      <label class="me-2 fs-5">Visit date: </label>
      <input type="date" v-model="date" @input="setDate"/>
    </div> -->
    
  
    
    <v-date-picker
      v-model="date"
      :allowed-dates="allowedDates"
      min="2024-01-01"
      :max='maxDate'
      class="mx-5"
      @input="setDate"
    ></v-date-picker>
    <!-- <v-date-picker
        color="primary"
      ></v-date-picker> -->
  </div>
  <div v-if="date" class="d-flex mx-5 flex-column" style="width:500px">
    <h5>Choose a category:</h5>
    <div class="d-flex">
      <div>
        <input type="radio" value="Public" id="public" class="me-3" v-model="category" name="category" @click="$store.commit('setCategory', 'public');$router.push('/public-details-enter');"/>
        <label for="public" class="me-5"><h6>Public</h6></label>
      </div>
      <div>
        <input type="radio" value="Institution" id="institution" class="me-3" v-model="category" name="category" @click="$store.commit('setCategory', 'institution');$router.push('/institution-details-enter');"/>
        <label for="institution" class="me-5"><h6>Institution</h6></label>
      </div>
      <div>
        <input type="radio" value="Foreigner" id="foreigner" class="me-3" v-model="category" name="category" @click="$store.commit('setCategory', 'foreigner');$router.push('/foreigner-details-enter'); "/>
        <label for="foreigner" class="me-5"><h6>Foreigner</h6></label>
      </div>
    </div>
    
    <div class="mt-3" v-if="category">
      <router-view></router-view>
    </div>
  </div>
</div>
</template>
<script>

export default {
name: 'App',

data() {
  return{
    date: null,
    category: null
  };
},
computed: {
  maxDate() {
    const currentDate = new Date();
    const maxDate = new Date(currentDate);
    maxDate.setDate(currentDate.getDate() + 14);
    return maxDate.toISOString().slice(0, 10); // Format as "YYYY-MM-DD"
  },
},
methods: {
  allowedDates(val) {
    const selectedDate = new Date(val);
    const today = new Date();
    // Set hours, minutes, seconds, and milliseconds to zero for both dates
    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    // Disable all Mondays and the days before today
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 15);
    const isMonday = selectedDate.getDay() === 1;
    const isBeforeToday = selectedDate < today;
    return !isMonday && !isBeforeToday;
  },
  setDate() {
    // // Parse the string into a JavaScript Date object
  const parsedDate = new Date(this.date);

// Check if the parsedDate is a valid Date object
if (!isNaN(parsedDate.getTime())) {
// If it's a valid Date, set it to this.date
this.date = parsedDate;

// Format and set the date to the store
const formattedDate = parsedDate.toISOString().split('T')[0];
    this.$store.commit('setDate', formattedDate)
  }
}
}
};
</script>