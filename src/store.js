import {createStore} from 'vuex';
const store = createStore({
  state() {
    return {
      mobile: sessionStorage.getItem('mobile') || null,
      base_url: 'http://localhost:8080',
      ctg: [],
      details: JSON.parse(sessionStorage.getItem('details')) || {},
      razordetails: JSON.parse(sessionStorage.getItem('razordetails')) || null,
      pubPrice: [],
      forPrice: [],
      instPrice: [],
      snrPrice: [],
      tax: [],
      category: sessionStorage.getItem('category') || null,
      date: null,
      qrDetails: JSON.parse(sessionStorage.getItem('qrDetails')) || null,
      session: sessionStorage.getItem('session') || null,
      capacity: null,
      bookDate: sessionStorage.getItem('bookDate') || null,
      origDate: sessionStorage.getItem('origDate') || null,
    };
  },
  mutations: {
    setMobile(state, payload) {
      state.mobile = payload; 
      sessionStorage.setItem('mobile', payload);
    }, 
    setDetails(state, payload){
      state.details = payload;
      sessionStorage.setItem('details', JSON.stringify(payload));
    },
    setCategory(state, payload) {
      state.category = payload;
      sessionStorage.setItem('category', payload);
    },
    setDate(state, payload) {
      state.date = payload;
    },
    setBdate(state, payload) {
      state.bookDate = payload;
      sessionStorage.setItem('bookDate', payload);
    },
    setRazor(state, payload) {
      state.razordetails = payload;
      sessionStorage.setItem('razordetails', JSON.stringify(payload))
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
      sessionStorage.setItem('qrDetails', JSON.stringify(payload));
    },
    setSession(state, payload) {
      state.session = payload;
      sessionStorage.setItem('session', payload);
    },
    setSenior(state, payload) {
      state.snrPrice = payload;
    },
    setTax(state, payload) {
      state.tax = payload;
    },
    setCapacity(state, payload) {
      state.capacity = payload;
    },
    setOrigDate(state, payload) {
      state.origDate = payload;
      sessionStorage.setItem('origDate', payload);
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
    },
    getUrl(state) {
      return state.base_url;
    },
    getOrigDate(state) {
      const origDateStr = state.origDate;
    if (origDateStr) {
        return new Date(origDateStr);
    } else {
        return null;
    }
    }
  },
});
export default store;
