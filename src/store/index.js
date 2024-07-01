import { createStore } from 'vuex';
import rootActions from './actions';
import rootGetters from './getters';
import rootMutations from './mutations';

const store = createStore({
  state() {
    return {
      mobile: sessionStorage.getItem('mobile') || null,
      //  base_url: 'http://192.168.88.172:8082',
      // base_url: 'http://localhost:8448',
      payment_id: sessionStorage.getItem('payment_id') || null,
       base_url: 'https://aksharammuseum.com',
      ctg: [],
      details: JSON.parse(sessionStorage.getItem('details')) || {},
      razordetails: JSON.parse(sessionStorage.getItem('razordetails')) || null,
      pricing: JSON.parse(sessionStorage.getItem('pricing'))||[],
      tax: JSON.parse(sessionStorage.getItem('tax'))||[],
      category: sessionStorage.getItem('category') || null,
      date: null,
      qrDetails: JSON.parse(sessionStorage.getItem('qrDetails')) || {},
      session: JSON.parse(sessionStorage.getItem('session')) || null,
      capacity: sessionStorage.getItem('capacity') || null,
      bookDate: sessionStorage.getItem('bookDate') || null,
      origDate: sessionStorage.getItem('origDate') || null,
      slots: null,
      capacityId: sessionStorage.getItem('capacityId') || null,
      activeSlots: JSON.parse(sessionStorage.getItem('activeSlots')) || [],
      selectedSlots: JSON.parse(sessionStorage.getItem('selectedSlots')) || []
    };
  },
  mutations: rootMutations,
  getters: rootGetters,
  actions: rootActions
});
export default store;
