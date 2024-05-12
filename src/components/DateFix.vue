<template>
  <v-responsive>
    <div class="d-flex justify-content-center align-items-center flex-wrap mx-auto bg-body-tertiary py-4">
      <div class="d-flex flex-column align-items-center">

        <v-date-picker v-model="date" color="light-green-darken-4" :allowed-dates="allowedDates" min="2024-01-01"
          :max='maxDate' class="mx-5 custom-date-picker" @update:model-value="setDate" max-width="350"
          width="420"></v-date-picker>
        <div class="d-flex">
          <v-icon class="mdi mdi-circle-medium text-success"></v-icon>
          <p class="text-success me-4">Available</p>
          <v-icon class="mdi mdi-circle-medium text-warning"></v-icon>
          <p class="text-warning me-4">Limited</p>
          <v-icon class="mdi mdi-circle-medium text-danger"></v-icon>
          <p class="text-danger me-1">Sold Out</p>
        </div>
      </div>
      <div v-if="date" class="d-flex mx-sm-5 flex-column ms-sm-5 ps-sm-5  ms-3 container" style="width:500px;"
        ref="dateContainer">
        <!-- Capacity -->
        <div class="ms-3">
          <h6 class="mt-3 mb-1" style="font-size: 18px;">{{ slots ? 'Slot' : 'Choose a Slot' }}:</h6>
          <div class="capacity mb-0" v-if="selectedSlot.length !== 0">
            <div class="d-flex flex-wrap">

              <div v-for="(slot,index) in selectedSlot" :key="index">
                <div v-if="slot.status" class="d-flex align-items-start flex-column mt-2" style="width:200px;">
                  <div class="me-3">
                    <input type="radio" :value="slot.startTime" :id="index" class="mt-2 lh-1" v-model="slots"
                      :name="category" @change="setCapacity(slot.startTime)"
                      :checked="slots === slot.startTime" />
                    {{ formatTime(slot.startTime) }} - {{ formatTime(slot.endTime) }}
                  </div>
                  <p class="my-0 lh-1 ms-3" style="font-size: 10px;"
                    :style="{ color: getRemainingColor(slot.capacity, 100) }"><i>{{
                      slot.capacity }} remaining</i></p>

                </div>
              </div>
            </div>
          </div>
          <v-card v-else width="400" max-width="340" height="100"
            class="d-flex justify-content-center align-items-center bg-transparent " elevation="0">
            <p v-if="error" class="text-danger text-center lh-1"><v-icon color="danger" class="mdi mdi-alert"></v-icon>
              <br>Sorry, something went wrong. Please try again later.<br><span style="font-size: small;">{{ error
                }}</span>
            </p>
            <v-progress-circular v-else v-model="load" color="primary" size="64" indeterminate></v-progress-circular>

          </v-card>
          <!-- Category -->
          <v-divider></v-divider>
          <h6 class="mt-3 mb-3" style="font-size: 18px;">{{ category ? 'Category' : 'Select your category' }}:</h6>
          <div class="d-flex flex-wrap" ref="routerViewContainer">
            <div>
              <input type="radio" value="public" id="public" class="me-1" v-model="category" name="category"
                @change="setCategory" />
              <label for="public" class="me-5">
                <p>Public</p>
              </label>
            </div>
            <div>
              <input type="radio" value="institution" id="institution" class="me-1" v-model="category" name="category"
                @change="setCategory" />
              <label for="institution" class="me-5">
                <p>Institution</p>
              </label>
            </div>
            <div>
              <input type="radio" value="foreigner" id="foreigner" class="me-1" v-model="category" name="category"
                @change="setCategory" />
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
  </v-responsive>
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
      slots: this.$store.getters.getCapacity, 
      error: '',
      load: true,
      selectedSlot : [],
      // disabledDates: ["2024-05-11", "2024-05-22"]
    };
  },
  watch: {
    category(newCategory) {
      this.navigateToRoute(newCategory);
    }
  },
  computed: {
    // selectedSlot() {
    //   return this.$store.getters.getSelectedSlot || [];
    // },

    maxDate() {
      const currentDate = new Date();
      const maxDate = new Date(currentDate);
      maxDate.setDate(currentDate.getDate() + 90);
      return maxDate.toISOString().slice(0, 10);
    },
  },
  mounted() {
    this.navigateToRoute(this.category);
    if (this.date) {
      this.setDate();
    }

  },
  methods: {
    getRemainingColor(remainingCapacity, totalCapacity) {
      const percentage = (remainingCapacity / totalCapacity) * 100;
      if (percentage >= 50) {
        return 'green';
      } else if (percentage > 0) {
        return 'orange';
      } else {
        return 'red';
      }
    },
    formatTime(timeString) {
      const [hours, minutes] = timeString.split(':');
      let hoursInt = parseInt(hours, 10);
      const ampm = hoursInt >= 12 ? 'pm' : 'am';
      hoursInt = hoursInt % 12;
      hoursInt = hoursInt ? hoursInt : 12; // Handle midnight (0 hours)
      return `${hoursInt}:${minutes} ${ampm}`;
    },

    allowedDates(val) {
      const selectedDate = new Date(val);
      const today = new Date();
      selectedDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);
      // const selectedDateString = selectedDate.toISOString().split('T')[0];
      // console.log(selectedDateString)
      // console.log(this.disabledDates.includes(selectedDateString))
      // if (this.disabledDates.includes(selectedDateString)) {
      //   return false; // Disable the date if it's in the list of disabled dates
      // }
      const maxDate = new Date(today);
      maxDate.setDate(today.getDate() + 90);
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
    
    setCapacity(slotId) {
      console.log('Selected slot:', slotId);
      this.slots = slotId
      console.log('slotId', slotId)
      console.log('category', this.slots)
      this.$store.commit('setCapacity', slotId);
    },

    async setDate() {
     
      this.selectedSlot = [];
      this.load = true;
      this.error =null
        const parsedDate = new Date(Date.parse(this.date));
        this.$store.commit('setOrigDate', this.date)
        if (!isNaN(parsedDate.getTime())) {
          this.date = parsedDate;
          var year = this.date.getFullYear();
          var month = String(this.date.getMonth() + 1).padStart(2, '0');
          var day = String(this.date.getDate()).padStart(2, '0');
          this.formattedDate = `${year}-${month}-${day}`;
          this.$store.commit('setDate', this.formattedDate);
          try {
            
            const res = await this.$store.dispatch('getSlotDate', this.formattedDate);
            if (res) {
              this.load = false;
              this.selectedSlot = res;
            }
          }
          catch (error) {
            this.load = false;
            console.log(error);
            this.error = error;
          }
          var today = new Date();
          month = String(today.getMonth() + 1).padStart(2, '0');
          day = String(today.getDate()).padStart(2, '0');
          year = today.getFullYear();
          today = `${year}-${month}-${day}`;
          this.$store.commit('setBdate', today);
        }
        this.scrollToElement('dateContainer');
    },
    scrollToElement(refName) {
      const element = this.$refs[refName];
      if (element) {
        const originalScrollBehavior = this.$router.options.scrollBehavior;
        this.$router.options.scrollBehavior = null;
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => {
          if (!this.scrolledToElement) {
            this.$router.options.scrollBehavior = originalScrollBehavior;
          }
        }, 500);
      }
    },
    setCategory() {
      this.$store.commit('setCategory', this.category);
      this.scrollToElement('routerViewContainer');
    },
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

:deep(.v-date-picker-header__content) {
  font-size: 24px !important;
}

:deep(.v-picker-title) {
  font-weight: 400 !important;
  padding-bottom: 0px !important;
}
</style>