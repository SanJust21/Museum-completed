<template>
  <v-responsive>
    <div class="d-flex justify-content-center bg-body-tertiary m-2 p-3 gap-5 flex-wrap">
      <div class="d-flex flex-column align-items-center">
        <v-date-picker v-model="date" color="light-green-darken-4" :allowed-dates="allowedDates"
          min="2024-01-01" :max="maxDate" class=" custom-date-picker" @update:model-value="setDate" max-width="350"
          width="350" height="450"></v-date-picker>
        <div class="d-flex">
          <v-icon class="mdi mdi-circle-medium text-success"></v-icon>
          <p class="text-success me-4 my-0 available">Available</p>
          <v-icon class="mdi mdi-circle-medium text-warning"></v-icon>
          <p class="text-warning me-4 my-0 available">Limited</p>
          <v-icon class="mdi mdi-circle-medium text-danger"></v-icon>
          <p class="text-danger me-1 my-0 available">Sold Out</p>
        </div>
      </div>
      <div v-if="date" class="d-flex" style="width:420px;" ref="dateContainer">
        <div class="px-2 bg-white">
          <div class="">
            <h6 class="mt-2 mb-3" style="font-size: 18px;">
              {{ slots ? 'Visit Time' : 'Choose your visit time' }}:
            </h6>
            <div class="capacity mb-0" v-if="selectedSlot.length !== 0">
              <div class="d-flex flex-wrap">
                <div v-for="(slot, index) in selectedSlot" :key="index">
                  <div v-if="slot.status" class="d-flex align-items-start flex-column mb-2" style="width:200px;">
                    <!-- <div v-if="!isSlotPast(slot.endTime)"> -->
                    <div class="me-3">
                      <input type="radio" :value="slot.startTime" :id="index" class="mb-2 lh-1" v-model="slots"
                        :name="category" @change="setCapacity(slot.startTime, slot.capacity, slot.totalCapacity)"
                        :checked="slots === slot.startTime" :disabled="isSlotPast(slot.endTime)" />
                      {{ formatTime(slot.startTime) }} - {{ formatTime(slot.endTime) }}
                    </div>
                    <p class="my-0 lh-1 ms-3" style="font-size: 10px;"
                      :style="{ color: getRemainingColor(slot.capacity, slot.totalCapacity) }">
                      <i>{{ slot.capacity }} remaining</i>
                    </p>
                    <!-- </div> -->

                  </div>
                </div>
              </div>
            </div>
            <v-card v-else width="400" max-width="340" height="100"
              class="d-flex justify-content-center align-items-center bg-transparent " elevation="0">
              <p v-if="error" class="text-danger text-center lh-1">
                <v-icon color="danger" class="mdi mdi-alert"></v-icon>
                <br />Sorry, something went wrong. Please try again later.<br /><span style="font-size: small;">{{ error
                  }}</span>
              </p>
              <v-progress-circular v-else v-model="load" color="primary" size="64" indeterminate></v-progress-circular>
              <!-- <v-skeleton-loader v-else v-model="load" type="table-tbody"></v-skeleton-loader> -->
            </v-card>
          </div>

          <v-divider class="mx-1"></v-divider>
          <h6 class=" mb-3" style="font-size: 18px;">
            {{ category ? 'Category' : 'Select your category' }}:
          </h6>

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
      <div class="mt-1 mb-0" v-if="category" ref="detailscontainer">
        <router-view></router-view>
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
      selectedSlot: [],
      disabledDates: [],
      selectedSlotCapacity: null,
    };
  },
  watch: {
    category(newCategory) {
      this.navigateToRoute(newCategory);
    },
    slots(newSlot) {
      const slot = this.selectedSlot.find(slot => slot.startTime === newSlot);
      if (slot) {
        this.selectedSlotCapacity = slot.capacity;
      }
    },
  },
  computed: {
    maxDate() {
      const currentDate = new Date();
      const maxDate = new Date(currentDate);
      maxDate.setDate(currentDate.getDate() + 90);
      return maxDate.toISOString().slice(0, 10);
    },
  },
  mounted() {
    this.navigateToRoute(this.category);
    this.$nextTick(() => {
      this.getHoliday();
      if (this.date) {
        this.setDate();
      }
    })
    this.getHoliday();
  },
  methods: {
    async getHoliday() {
      try {
        const response = await this.$store.dispatch('getHoliday');
        if (response) {
          this.holidayName = response;
          this.disabledDates = response.map(date => new Date(date));
        }
      }
      catch (error) {
        console.log(error)
      }
    },
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
      const selectedDateString = selectedDate.toISOString().split('T')[0];
      console.log(selectedDateString)
      const isDisabled = this.disabledDates.some(disabledDate => {
        return selectedDate.toDateString() === disabledDate.toDateString();
      });

      if (isDisabled) {
        return false;
      }
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

    setCapacity(slotId, capacity, total) {
      // console.log('Selected slot:', slotId);
      this.slots = slotId
      // console.log('slotId', slotId)
      // console.log('category', this.slots)
      this.$store.commit('setCapacity', slotId);
      const percentage = (capacity / total) * 100;
      console.log(percentage)
      const selectedDateButton = document.querySelector('.v-date-picker-month__day--selected>button');
      if (selectedDateButton) {
        // Remove any existing color classes
        selectedDateButton.classList.remove('bg-green', 'bg-orange', 'bg-danger');
      }
      if (percentage >= 50) {
        selectedDateButton.classList.add('bg-green');
      } else if (percentage > 0) {
        selectedDateButton.classList.add('bg-orange');
      } else if (percentage === 0){
        selectedDateButton.classList.add('bg-danger');
      }
      this.selectedSlotCapacity = capacity;
    },

    async setDate() {
      // this.getDateClass(this.date);
      this.slots = null;
      this.selectedSlot = [];
      this.load = true;
      this.error = null
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
    isSlotPast(slotEndTime) {
      const selectedDate = new Date(this.date);
      const now = new Date();
      if (
        selectedDate.getFullYear() === now.getFullYear() &&
        selectedDate.getMonth() === now.getMonth() &&
        selectedDate.getDate() === now.getDate()
      ) {
        const [hours, minutes] = slotEndTime.split(':').map(Number);
        const slotTime = new Date();
        slotTime.setHours(hours, minutes, 0, 0);
        return slotTime < now;
      }
      return false;
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

input {
  cursor: pointer;
}

.available {
  font-size: 14px;
}

.bg-success {
  background-color: #28a745 !important;
}

.bg-warning {
  background-color: #ffc107 !important;
}

.bg-danger {
  background-color: #dc3545 !important;
}
</style>
