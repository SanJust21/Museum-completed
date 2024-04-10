import { createStore } from 'vuex';
import rootActions from './actions';
import rootGetters from './getters';
import rootMutations from './mutations';

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
      capacity: sessionStorage.getItem('capacity') || null,
      bookDate: sessionStorage.getItem('bookDate') || null,
      origDate: sessionStorage.getItem('origDate') || null,
    };
  },
  mutations: rootMutations,
  getters: rootGetters,
  actions: rootActions
});
export default store;
