<template>

  <div class="d-flex justify-content-center flex-wrap mx-auto bg-body-tertiary py-4">
    <div class="d-flex flex-column align-items-center">
      <v-date-picker v-model="date" color="light-green-darken-4" :allowed-dates="allowedDates" min="2024-01-01"
        :max='maxDate' class="mx-5 custom-date-picker" @click="setDate"></v-date-picker>
      <div class="d-flex">
        <v-icon class="mdi mdi-circle-medium text-success"></v-icon>
        <p class="text-success me-4">Available</p>
        <v-icon class="mdi mdi-circle-medium text-warning"></v-icon>
        <p class="text-warning me-4">Limited</p>
        <v-icon class="mdi mdi-circle-medium text-danger"></v-icon>
        <p class="text-danger me-1">Sold Out</p>
      </div>
    </div>
    <div v-if="date" class="d-flex mx-5 flex-column ms-5 ps-5" style="width:500px">
      <!-- Capacity -->
      <div class="ms-3">
        <h6 class="mt-3 mb-0">{{ slot ? 'Slot' : 'Choose a Slot' }}:</h6>
        <div class="capacity mb-0">
          <div class="d-flex">
            <div class="d-flex align-items-start">
              <input type="radio" value="slot1" id="slot1" class="me-1 mt-2" v-model="slot" name="slot1"
                @click="$store.commit('setCapacity', 'slot1');" />
              <div class="d-flex flex-column">
                <label for="slot1" class="me-5">Slot 1</label>
                <label for="slot1" class="me-5 text-warning" style="font-size: 12px;"><i>10 remaining</i></label>
              </div>
            </div>
            <div class="d-flex align-items-start">
              <input type="radio" value="slot2" id="slot2" class="me-1 mt-1" v-model="slot" name="slot2"
                @click="$store.commit('setCapacity', 'slot2');" />
              <div class="d-flex flex-column">
                <label for="slot2" class="me-5">Slot 2</label>
                <label for="slot2" class="me-5 text-success" style="font-size: 12px;"><i>50 remaining</i></label>
              </div>
            </div>
            <div class="d-flex align-items-start">
              <input type="radio" value="slot3" id="slot3" class="me-1 mt-1" v-model="slot" name="slot3"
                @click="$store.commit('setCapacity', 'slot3');" />
              <div class="d-flex flex-column">
                <label for="slot3" class="me-5">Slot 3</label>
                <label for="slot3" class="me-5 text-danger" style="font-size: 12px; "><i>Sold out</i></label>
              </div>
            </div>
          </div>
        </div>
        <!-- Category -->
        <h6 class="mt-1 mb-0">{{ category ? 'Category' : 'Choose a category' }}:</h6>
        <div class="d-flex">
          <div>
            <input type="radio" value="public" id="public" class="me-1" v-model="category" name="category"
              @change="$store.commit('setCategory', category);" />
            <label for="public" class="me-5">
              <p>Public</p>
            </label>
          </div>
          <div>
            <input type="radio" value="institution" id="institution" class="me-1" v-model="category" name="category"
              @change="$store.commit('setCategory', category);" />
            <label for="institution" class="me-5">
              <p>Institution</p>
            </label>
          </div>
          <div>
            <input type="radio" value="foreigner" id="foreigner" class="me-1" v-model="category" name="category"
              @change="$store.commit('setCategory', category);" />
            <label for="foreigner" class="me-5">
              <p>Foreigner</p>
            </label>
          </div>
        </div>
      </div>
      <div class="mt-1 mb-0" v-if="category">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
// import axios from 'axios';
export default {
  name: 'App',

  data() {
    return {
      date: this.$store.getters.getOrigDate,
      formattedDate: null,
      bookingDate: this.$store.getters.getBdate,
      category: this.$store.getters.getCategory,
      slot: null
    };
  },
  watch: {
    category(newCategory) {
      this.navigateToRoute(newCategory);
    }
  },
  computed: {
    maxDate() {
      const currentDate = new Date();
      const maxDate = new Date(currentDate);
      maxDate.setDate(currentDate.getDate() + 15);
      return maxDate.toISOString().slice(0, 10);
    },
  },
  mounted() {
    this.navigateToRoute(this.category);
  },
  methods: {
    allowedDates(val) {

      const selectedDate = new Date(val);
      const today = new Date();
      selectedDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);
      const maxDate = new Date(today);
      maxDate.setDate(today.getDate() + 15);
      const isMonday = selectedDate.getDay() === 1;
      const isBeforeToday = selectedDate < today;
      return !isMonday && !isBeforeToday;
    },
    navigateToRoute(category) {
      if (category === 'public') {
        this.$router.push('/public-details-enter');
      } else if (category === 'institution') {
        this.$router.push('/institution-details-enter');
      } else if (category === 'foreigner') {
        this.$router.push('/foreigner-details-enter');
      }
    },

    setDate() {
      // Attempt to parse the date string into a Date object
      const parsedDate = new Date(Date.parse(this.date));
      this.$store.commit('setOrigDate', this.date)
      // Check if the parsedDate is a valid Date object
      if (!isNaN(parsedDate.getTime())) {
        // If it's a valid Date, set it to this.date
        this.date = parsedDate;

        // Format and set the date to the store
        var year = this.date.getFullYear();
        var month = String(this.date.getMonth() + 1).padStart(2, '0');
        var day = String(this.date.getDate()).padStart(2, '0');
        this.formattedDate = `${year}-${month}-${day}`;

        // Set the formatted date to the store
        this.$store.commit('setDate', this.formattedDate);

        // Set today's date to the store
        var today = new Date();
        month = String(today.getMonth() + 1).padStart(2, '0');
        day = String(today.getDate()).padStart(2, '0');
        year = today.getFullYear();
        today = `${year}-${month}-${day}`;
        this.$store.commit('setBdate', today);
      } else {
        // Handle the case where the date string cannot be parsed
        console.error('Invalid date format:', this.date);
        // Optionally, set a default date or handle the error in another way
      }
    }
  }
};
</script>
<style scoped>
button {
  background-color: #1B5E20 !important;
}

.v-date-picker-header {
  padding-bottom: 1px !important;
}

::v-deep .v-date-picker-header__content {
  font-size: 24px !important;
}

::v-deep .v-picker-title {
  font-weight: 400 !important;
  padding-bottom: 0px !important;
}
</style>