import {createStore} from 'vuex';
const store = createStore({
  state() {
    return{ 
      mobile: null,
      ctg : [
    {
        "id": 1,
        "type": "adult",
        "price": 50,
        "category": "public"
    },
    {
        "id": 3,
        "type": "foreign_adult",
        "price": 200,
        "category": "foreigner"
    },
    {
        "id": 4,
        "type": "foreign_child",
        "price": 100,
        "category": "foreigner"
    },
    {
        "id": 5,
        "type": "student",
        "price": 30,
        "category": "institution"
    },
    {
        "id": 6,
        "type": "teacher",
        "price": 40,
        "category": "institution"
    },
    {
        "id": 52,
        "type": "IGST",
        "price": 18,
        "category": "tax"
    },
    {
        "id": 53,
        "type": "CESS",
        "price": 0,
        "category": "tax"
    },
    {
        "id": 55,
        "type": "GST",
        "price": 2,
        "category": "tax"
    },
    {
        "id": 102,
        "type": "senior",
        "price": 30,
        "category": "public"
    },
    {
        "id": 2,
        "type": "child",
        "price": 30,
        "category": "public"
    }
],
      // details: null,
      details: {},
      razordetails: null,
      pubPrice: [],
      forPrice: [],
      instPrice: [],
      snrPrice: [],
      tax: [],
      category: null,
      date: null,
      qrDetails:{},
      session: null,
      capacity: null,
      bookDate : null
    };
  },
  mutations: {
    setMobile(state, payload) {
       state.mobile = payload; 
    }, 
    setDetails(state, payload){
    state.details = payload;
    },
    setCategory(state, payload) {
    state.category = payload;
    },
    setDate(state, payload) {
      state.date = payload;
    },
    setBdate(state, payload) {
      state.bookDate = payload;
    },
    setRazor(state, payload) {
      state.razordetails = payload;
    },
    setPublic(state, payload) {
      state.pubPrice = payload;
    },
    setForeign(state, payload) {
      state.forPrice = payload;
    },
    setInstitute(state, payload) {
      state.instPrice = payload;
    },
    setQR(state, payload) {
      state.qrDetails = payload;
    },
    setSession(state, payload) {
      state.session = payload;
    },
    setSenior(state, payload) {
      state.snrPrice = payload;
    },
    setTax(state, payload) {
      state.tax = payload;
    },
    setCapacity(state, payload) {
      state.capacity = payload;
    }
  },
  getters: {
    getMobile(state) {
      return state.mobile;
    },
    getDetails(state) {
      return state.details
    },
    getCategory(state) {
      return state.category;
    },
    getDate(state) {
      return state.date;
    },
    getBdate(state) {
      return state.bookDate;
    },
    getRazor(state) {
      return state.razordetails;
    },
    getPublic(state) {
      return state.pubPrice 
    },
    getForeign(state) {
      return state.forPrice
    },
    getInstitute(state) {
      return state.instPrice 
    },
    getQR(state) {
      return state.qrDetails 
    },
    getsession(state) {
      return state.session 
    },
    getSenior(state) {
      return state.snrPrice;
    },
    getTax(state) {
      return state.tax;
    },
    getctg(state) {
      return state.ctg;
    },
    getCapacity(state) {
      return state.capacity;
    }
  },
});
export default store;
