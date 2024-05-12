import { createStore } from 'vuex';
import rootActions from './actions';
import rootGetters from './getters';
import rootMutations from './mutations';

const store = createStore({
  state() {
    return {
      mobile: sessionStorage.getItem('mobile') || null,
      //  base_url: 'http://192.168.1.3:5000',
      base_url: 'http://localhost:8448',
      payment_id: sessionStorage.getItem('payment_id') || null,
      //  base_url: 'https://aksharammuseum.com',
      ctg: [],
      details: JSON.parse(sessionStorage.getItem('details')) || {},
      razordetails: JSON.parse(sessionStorage.getItem('razordetails')) || null,
      pricing: JSON.parse(sessionStorage.getItem('pricing'))||[],
      // pubPrice: JSON.parse(sessionStorage.getItem('pubPrice'))||[{price:50},{price:20},{price:20}],
      // forPrice: JSON.parse(sessionStorage.getItem('forPrice'))||[{price:500},{price:200}],
      // instPrice: JSON.parse(sessionStorage.getItem('instPrice'))||[{price:30},{price:20}],
      // snrPrice: [{price:50}],
      tax: [{ type: 'GST', price: 12 }],
      category: sessionStorage.getItem('category') || null,
      date: null,
      qrDetails: JSON.parse(sessionStorage.getItem('qrDetails')) || {},
      session: sessionStorage.getItem('session') || null,
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
