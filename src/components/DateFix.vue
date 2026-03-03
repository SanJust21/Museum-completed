<template>
  <v-responsive>
    <div class="container-fluid px-3 py-4">
      <div class="row g-4">

        <!-- SECTION 1: Date Picker -->
        <div class="col-lg-4">
          <div class="card shadow-sm border-0 h-100">
            <div class="card-body d-flex flex-column align-items-center">
              <h5 class="card-title mb-4 text-center">Select Visit Date</h5>

              <v-date-picker
                v-model="date"
                color="light-green-darken-4"
                :allowed-dates="allowedDates"
                min="2024-01-01"
                :max="maxDate"
                max-width="320"
                width="320"
                height="420"
                class="custom-date-picker mx-auto"
                @update:model-value="setDate"
              />

              <div class="d-flex mt-4 flex-wrap justify-content-center gap-4">
                <span v-for="legend in capacityLegend" :key="legend.label" class="d-flex align-items-center">
                  <v-icon :class="`mdi mdi-circle-medium text-${legend.color} me-1`" />
                  <span :class="`text-${legend.color} small`">{{ legend.label }}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- SECTION 2: Time Slots + Category -->
        <div v-if="date" class="col-lg-4">
          <div class="card shadow-sm border-0 h-100">
            <div class="card-body">
              <h5 class="card-title mb-4">Choose Time & Category</h5>

              <h6 class="mb-3 fw-semibold">Visit Time Slots</h6>

              <template v-if="visibleSlots.length > 0">
                <div class="d-flex flex-wrap gap-3 mb-5">
                  <label
                    v-for="(slot, index) in visibleSlots"
                    :key="slot.id"
                    class="slot-label d-flex flex-column mb-2 p-2 border rounded"
                    style="width: 48%; min-width: 180px; cursor: pointer;"
                  >
                    <div class="d-flex align-items-center">
                      <input
                        type="radio"
                        :value="slot.startTime"
                        :id="`slot-${index}`"
                        class="me-2"
                        v-model="selectedSlotTime"
                        name="visit-time"
                        :disabled="isSlotPast(slot.endTime)"
                        @change="onSlotSelected(slot)"
                      />
                      <span class="fw-medium">{{ formatTime(slot.startTime) }} – {{ formatTime(slot.endTime) }}</span>
                    </div>
                    <small
                      class="ms-4 mt-1"
                      :style="{ color: getRemainingColor(slot.capacity, slot.totalCapacity) }"
                    >
                      {{ slot.capacity }} remaining
                    </small>
                  </label>
                </div>
              </template>

              <div v-else class="text-center py-5 text-muted">
                <v-progress-circular v-if="load" indeterminate color="primary" size="48" class="mb-3" />
                <p class="mb-0">No available slots for this date</p>
              </div>

              <v-divider class="my-4" />

              <h6 class="mb-3 fw-semibold">Category</h6>

              <div v-if="categories.length === 0" class="text-center py-4">
                <v-progress-circular indeterminate color="primary" size="32" />
                <p class="mt-2 small text-muted">Loading categories...</p>
              </div>

              <div v-else class="d-flex flex-column gap-2">
                <label
                  v-for="cat in categories"
                  :key="cat.id"
                  class="d-flex align-items-center p-2 border rounded"
                  style="cursor: pointer;"
                >
                  <input
                    type="radio"
                    :value="cat.id"
                    :id="`cat-${cat.id}`"
                    class="me-2"
                    v-model="selectedCategoryId"
                    name="category"
                    @change="onCategorySelected"
                  />
                  <span class="fw-medium">{{ cat.category }}</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- SECTION 3: User Form + Tickets -->
        <div v-if="date && selectedCategoryId" class="col-lg-4">
          <div class="card shadow-sm border-0 h-100">
            <div class="card-body">
              <h5 class="card-title mb-4">Your Details & Tickets</h5>

              <v-form ref="userForm" class="mb-5">
                <v-text-field
                  v-model="name"
                  label="Full Name *"
                  :rules="nameRules"
                  required outlined dense hide-details="auto"
                  class="mb-3"
                />
                <v-text-field
                  v-model="mobileNum"
                  label="Mobile Number *"
                  :rules="mobRules"
                  required outlined dense hide-details="auto"
                  class="mb-3"
                  :readonly="!!mobileNum"
                />
                <v-text-field
                  v-model="email"
                  label="Email Address *"
                  :rules="emailRules"
                  required outlined dense hide-details="auto"
                  class="mb-3"
                />

                <!-- District field with "Other" support -->
                <template v-if="selectedCategoryRequiresDistrict">
                  <v-select
                    v-model="districtSelection"
                    :items="districtsWithOther"
                    label="District *"
                    :rules="districtRules"
                    required outlined dense hide-details="auto"
                    class="mb-3"
                    placeholder="Select your district"
                    @update:model-value="onDistrictChange"
                  />
                  <v-text-field
                    v-if="districtSelection === 'Other'"
                    v-model="customDistrict"
                    label="Please specify your district *"
                    :rules="customDistrictRules"
                    required outlined dense hide-details="auto"
                    class="mb-3"
                    placeholder="Enter your district"
                    autofocus
                  />
                </template>
              </v-form>

              <h6 class="mb-3 fw-semibold">Select Tickets</h6>

              <div v-if="loadingTypes" class="text-center py-5">
                <v-progress-circular indeterminate color="primary" size="40" />
                <p class="mt-3 text-muted">Loading ticket types & prices...</p>
              </div>

              <template v-else-if="categoryTypes.length > 0">
                <div class="d-flex flex-column gap-3 mb-4">
                  <div
                    v-for="type in categoryTypes"
                    :key="type.id"
                    class="ticket-row d-flex justify-content-between align-items-center px-3 py-3 border rounded bg-light shadow-sm"
                  >
                    <div class="pe-3">
                      <strong>{{ type.typeName }}</strong>
                      <div class="text-muted small">₹{{ type.price ?? 0 }}</div>
                    </div>
                    <div class="quantity-controls d-flex align-items-center gap-2">
                      <button
                        type="button"
                        class="quantity-btn minus"
                        :disabled="getQuantity(type.id) === 0"
                        @click="updateQuantity(type.id, -1)"
                      >−</button>
                      <span class="quantity-display">{{ getQuantity(type.id) }}</span>
                      <button
                        type="button"
                        class="quantity-btn plus"
                        @click="updateQuantity(type.id, 1)"
                      >+</button>
                    </div>
                  </div>
                </div>

                <div class="d-flex justify-content-between align-items-center mt-5 pt-3 border-top">
                  <h5 class="mb-0">Total</h5>
                  <h5 class="text-success fw-bold mb-0">₹{{ totalAmount.toFixed(2) }}</h5>
                </div>

                <v-btn
                  v-if="selectedSlotTime && totalAmount > 0"
                  color="green-darken-4"
                  class="mt-4 text-white"
                  x-large block
                  :disabled="!isFormValid"
                  @click="proceedToDetails"
                >
                  PROCEED TO BOOK
                </v-btn>
              </template>

              <div v-else class="text-center py-5 text-warning">
                <p>No ticket types available for selected category.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Placeholder when no date selected -->
        <div v-if="!date" class="col-lg-8 d-flex align-items-center justify-content-center" style="min-height: 420px;">
          <h5 class="text-muted text-center m-0">Please select a date to view available time slots and categories.</h5>
        </div>

      </div>
    </div>

    <!-- Snackbar -->
    <v-snackbar v-model="snackbar" :color="snackColor" timeout="5000" top>
      {{ snackMessage }}
      <template #action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-responsive>
</template>

<script>
const MOBILE_REGEX = /^\d{10}$/;
const EMAIL_REGEX  = /.+@.+\..+/;

export default {
  name: 'DateFix',

  data() {
    return {
      date:                this.$store.getters.getOrigDate || null,
      formattedDate:       null,
      selectedCategoryId:  this.$store.getters.getCategoryId || null,
      selectedCategoryObj: null,

      // Slot state — single source of truth
      allSlots:             [],
      selectedSlotTime:     this.$store.getters.getCapacity || null,
      selectedSlotId:       null,
      selectedSlotCapacity: null,

      load:          true,
      loadingTypes:  false,
      disabledDates: [],

      categoryTypes: [],
      quantities:    {},

      // User details
      name:      '',
      mobileNum: '',
      email:     '',

      // District — two-part state
      districtSelection: null,  // v-select value (named district or 'Other')
      customDistrict:    '',    // free-text shown only when 'Other' is selected

      districts: [
        'Alappuzha', 'Ernakulam', 'Idukki', 'Kannur', 'Kasaragod',
        'Kollam', 'Kottayam', 'Kozhikode', 'Malappuram', 'Palakkad',
        'Pathanamthitta', 'Thiruvananthapuram', 'Thrissur', 'Wayanad',
      ],

      capacityLegend: [
        { label: 'Available', color: 'success' },
        { label: 'Limited',   color: 'warning' },
        { label: 'Sold Out',  color: 'danger'  },
      ],

      snackbar:     false,
      snackMessage: '',
      snackColor:   'success',
    };
  },

  computed: {
    categories() {
      return this.$store.getters.getCategories || [];
    },

    categoryMap() {
      return Object.fromEntries(this.categories.map(c => [c.id, c]));
    },

    slotMap() {
      return Object.fromEntries(this.allSlots.map(s => [s.startTime, s]));
    },

    visibleSlots() {
      return this.allSlots.filter(s => s.status === true);
    },

    maxDate() {
      const d = new Date();
      d.setDate(d.getDate() + 90);
      return d.toISOString().slice(0, 10);
    },

    totalAmount() {
      return this.categoryTypes.reduce((sum, type) => {
        return sum + (this.quantities[type.id] || 0) * (type.price || 0);
      }, 0);
    },

    districtsWithOther() {
      return [...this.districts, 'Other'];
    },

    /**
     * Always resolves to the actual district name.
     * When 'Other' is selected, returns the manually typed value.
     * Never exposes the raw "Other" string to the store or review page.
     */
    resolvedDistrict() {
      if (this.districtSelection === 'Other') {
        return this.customDistrict.trim() || null;
      }
      return this.districtSelection || null;
    },

    selectedCategoryRequiresDistrict() {
      if (!this.selectedCategoryObj) return false;
      if (typeof this.selectedCategoryObj.requiresDistrict === 'boolean') {
        return this.selectedCategoryObj.requiresDistrict;
      }
      return (this.selectedCategoryObj.category || '').toLowerCase().includes('institution');
    },

    isFormValid() {
      const base = (
        this.name.trim().length >= 3 &&
        MOBILE_REGEX.test(this.mobileNum) &&
        EMAIL_REGEX.test(this.email)
      );
      if (!this.selectedCategoryRequiresDistrict) return base;
      if (this.districtSelection === 'Other') {
        return base && this.customDistrict.trim().length >= 2;
      }
      return base && !!this.districtSelection;
    },

    nameRules()     { return [v => !!v || 'Name is required']; },
    mobRules()      { return [v => !!v || 'Mobile is required', v => MOBILE_REGEX.test(v) || 'Must be 10 digits']; },
    emailRules()    { return [v => !!v || 'E-mail is required', v => EMAIL_REGEX.test(v) || 'E-mail must be valid']; },
    districtRules() { return [v => !!v || 'District is required for this category']; },
    customDistrictRules() {
      return [
        v => !!v?.trim()           || 'Please enter your district',
        v => v?.trim().length >= 2 || 'District name is too short',
      ];
    },
  },

  async mounted() {
    await this.loadCategories();

    const details  = this.$store.getters.getDetails || {};
    this.mobileNum = this.$store.getters.getMobile || '';
    this.name      = details.name  || '';
    this.email     = details.email || '';

    // Restore saved district — detect whether it was a custom (non-listed) value
    const savedDistrict = details.district || null;
    if (savedDistrict) {
      if (this.districts.includes(savedDistrict)) {
        this.districtSelection = savedDistrict;
      } else {
        this.districtSelection = 'Other';
        this.customDistrict    = savedDistrict;
      }
    }

    await this.$nextTick();
    this.getHoliday();
    if (this.date) await this.setDate();
    if (this.selectedCategoryId) await this.onCategorySelected();
  },

  methods: {
    // ─── Data Loading ─────────────────────────────────────────────────────────

    async loadCategories() {
      if (this.categories.length > 0) return;
      try {
        await this.$store.dispatch('getAllCategories');
      } catch (err) {
        console.error('loadCategories:', err);
      }
    },

    async getHoliday() {
      try {
        const response = await this.$store.dispatch('getHoliday');
        if (response) this.disabledDates = response.map(d => new Date(d));
      } catch (err) {
        console.error('getHoliday:', err);
      }
    },

    async setDate() {
      this.resetSlotState();

      const d = new Date(this.date);
      if (isNaN(d.getTime())) return;

      this.$store.commit('setOrigDate', this.date);

      const y   = d.getFullYear();
      const m   = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      this.formattedDate = `${y}-${m}-${day}`;
      this.$store.commit('setDate', this.formattedDate);

      try {
        const res = await this.$store.dispatch('getSlotByDate', this.formattedDate);
        if (res) {
          this.allSlots = res.map(slot => ({
            id:            slot.slotId          ?? slot.id,
            startTime:     slot.slotStartTime   ?? slot.startTime,
            endTime:       slot.slotEndTime     ?? slot.endTime,
            capacity:      slot.presentCapacity ?? slot.capacity,
            totalCapacity: slot.totalCapacity,
            status:        slot.presentStatus   ?? slot.status,
          }));
        }
      } catch (err) {
        console.error('setDate:', err);
      } finally {
        this.load = false;
      }
    },

    async onCategorySelected() {
      const cat = this.categoryMap[this.selectedCategoryId];
      if (!cat) return;

      this.selectedCategoryObj = cat;
      this.$store.commit('setCategory', cat.category?.trim() || null);
      this.$store.commit('setCategoryId', cat.id);

      this.loadingTypes  = true;
      this.categoryTypes = [];
      this.quantities    = {};

      try {
        const [types, prices] = await Promise.all([
          this.$store.dispatch('getTypesByCategoryId', cat.id),
          this.$store.dispatch('getCategoryPrices'),
        ]);

        const catName = cat.category?.trim();
        this.categoryTypes = types.map(type => {
          const priceObj = prices.find(p =>
            (p.typeId && p.typeId === type.id) ||
            (p.categoryName === catName && p.typeName === type.typeName)
          );
          return { ...type, price: priceObj?.price ?? 0 };
        });

        this.quantities = Object.fromEntries(this.categoryTypes.map(t => [t.id, 0]));
      } catch (err) {
        console.error('onCategorySelected:', err);
      } finally {
        this.loadingTypes = false;
      }
    },

    // ─── District Handlers ────────────────────────────────────────────────────

    onDistrictChange(value) {
      if (value !== 'Other') this.customDistrict = '';
    },

    // ─── Slot Helpers ─────────────────────────────────────────────────────────

    onSlotSelected(slot) {
      this.selectedSlotTime     = slot.startTime;
      this.selectedSlotId       = slot.id;
      this.selectedSlotCapacity = slot.capacity;
      this.$store.commit('setCapacity', slot.startTime);
    },

    resetSlotState() {
      this.load             = true;
      this.allSlots         = [];
      this.selectedSlotTime = null;
      this.selectedSlotId   = null;
    },

    isSlotPast(endTime) {
      const selDate = new Date(this.date);
      const now     = new Date();
      if (selDate.toDateString() !== now.toDateString()) return false;
      const [h, m] = endTime.split(':').map(Number);
      const end = new Date();
      end.setHours(h, m, 0, 0);
      return end < now;
    },

    // ─── Ticket Helpers ───────────────────────────────────────────────────────

    getQuantity(typeId) {
      return this.quantities[typeId] || 0;
    },

    updateQuantity(typeId, delta) {
      const next = (this.quantities[typeId] || 0) + delta;
      if (next < 0) return;
      this.quantities = { ...this.quantities, [typeId]: next };
    },

    // ─── Form Submission ──────────────────────────────────────────────────────

    proceedToDetails() {
      if (!this.$refs.userForm.validate()) {
        return this.showSnackbar('Please fill all required fields correctly', 'red');
      }
      if (!this.selectedSlotTime) {
        return this.showSnackbar('Please select your visit time!', 'red');
      }
      if (!this.selectedCategoryId) {
        return this.showSnackbar('Please select your category!', 'red');
      }
      if (this.totalAmount === 0) {
        return this.showSnackbar('Please select at least one ticket!', 'red');
      }
      if (this.selectedCategoryRequiresDistrict && !this.resolvedDistrict) {
        return this.showSnackbar(
          this.districtSelection === 'Other'
            ? 'Please enter your district name'
            : 'District is required for this category',
          'red'
        );
      }

      const payload = {
        categoryId:    this.selectedCategoryId,
        categoryObj:   { ...this.selectedCategoryObj },
        cat:           this.selectedCategoryObj?.category?.trim() || this.$store.getters.getCategory || '',
        date:          this.formattedDate,
        slot:          this.selectedSlotTime,
        slotId:        this.selectedSlotId,
        name:          this.name,
        mobile:        this.mobileNum,
        email:         this.email,
        district:      this.selectedCategoryRequiresDistrict ? this.resolvedDistrict : null,
        quantities:    { ...this.quantities },
        categoryTypes: this.categoryTypes.map(t => ({ ...t })),
        total:         this.totalAmount,
        capacity:      this.selectedSlotCapacity,
      };

      this.$store.commit('setDetails', payload);
      this.$store.commit('setMobile', this.mobileNum);
      this.$router.push('/review-details');
    },

    // ─── UI Utilities ─────────────────────────────────────────────────────────

    showSnackbar(message, color = 'success') {
      this.snackMessage = message;
      this.snackColor   = color;
      this.snackbar     = true;
    },

    getRemainingColor(remaining, total) {
      const pct = (remaining / total) * 100;
      return pct >= 50 ? 'green' : pct > 0 ? 'orange' : 'red';
    },

    formatTime(str) {
      const [h, m]  = str.split(':');
      const hours   = parseInt(h, 10);
      const ampm    = hours >= 12 ? 'pm' : 'am';
      const display = hours % 12 || 12;
      return `${display}:${m.padStart(2, '0')} ${ampm}`;
    },

    allowedDates(val) {
      const sel   = new Date(val);
      const today = new Date();
      sel.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);

      if (sel < today) return false;
      if (sel.getDay() === 1) return false;
      if (this.disabledDates.some(d => sel.toDateString() === d.toDateString())) return false;
      return true;
    },
  },
};
</script>

<style scoped>
.ticket-row {
  background: #f8f9fa;
  transition: background 0.18s;
}
.ticket-row:hover {
  background: #e9ecef;
}

.quantity-btn {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #1b5e20;
  color: white;
  border: none;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.quantity-btn:disabled {
  background: #a5d6a7;
  opacity: 0.75;
  cursor: not-allowed;
}

.quantity-display {
  min-width: 50px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.35rem;
  font-weight: 600;
  background: white;
  border: 1px solid #ced4da;
  border-radius: 6px;
}
</style>