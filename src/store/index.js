import { createStore } from 'vuex';
import rootActions from './actions';
import rootGetters from './getters';
import rootMutations from './mutations';

const store = createStore({
  state() {
    return {
      mobile: sessionStorage.getItem('mobile') || null,
      // base_url: 'http://192.168.1.13:8080',
      // base_url: 'http://localhost:8448',
       base_url: 'http://94.176.233.47:5000',
      ctg: [],
      details: JSON.parse(sessionStorage.getItem('details')) || {},
      razordetails: JSON.parse(sessionStorage.getItem('razordetails')) || null,
      pubPrice: JSON.parse(sessionStorage.getItem('pubPrice'))||[{price:50},{price:20},{price:20}],
      forPrice: JSON.parse(sessionStorage.getItem('forPrice'))||[{price:500},{price:200}],
      instPrice: JSON.parse(sessionStorage.getItem('instPrice'))||[{price:30},{price:20}],
      snrPrice: [{price:50}],
      tax: [{ type: 'GST', price: 12 }],
      category: sessionStorage.getItem('category') || null,
      date: null,
      qrDetails: JSON.parse(sessionStorage.getItem('qrDetails')) || {"qrCodeImage": "iVBORw0KGgoAAAANSUhEUgAAASwAAAEsAQAAAABRBrPYAAACRklEQVR4Xu2WwY7kIAxEzYnP4E8h/ad8wh45xVNVpHu3mdXOXEarWFgocuzXLaUok5h/J37ZWvlrbGyJjS2xsSU2tsTGlvgJ7DRGteLDau68ySi/kkCYio1pb6Pg9si4ZUWtSFi33Cu6BqYn79UKyAqVQmJWHi9BxMfFLA24+tr0B2WJh/llb9Wfsnw2+f0xY1Ro8r5YjYVdMWjyyTfH2fW7EwaDIAmWRn1YG7R6nRPNn8TCMpcUoCDJJ4O3cGE7EMZbiqAjS0m6VMJoh8L47IQhhnyeeXC59+mBYNgxH58mLxThOdqN/UBY5tfFodfQTFyMyfyRMOf8otinz5NgANRH3TAYBDE9+DkVGEVNDrXECYRJDZkc+05NGov0edMPwmBOSxcw4NsolALjPJhTn0jYsKRnhxrgnV1avQ2blgiD4akPzC9HGC1ejUcZvqmK/iUSpmdXJCYka+YsH2+C3B7zUXB5vE5mnVdM4HP1w2ConBpkdg2fT3K40wDBMOcxxSl2OpyFSwqOeShsisB9l8mrPD8FqX/Owv0xZwvGZh2zfFhB7TBjHg2jFMY3L3nZgFv/+OSQu2OnDistDfKEkYOPhTn8bJrfafi56bgsJo+AXUDjdhfX9eRxzdwDYScVwMuI67n1net9nCNgzHuTycFYZg5A9WAYD+fmEkE6nNx38DGxiroV59nFN1GCAXgbF2P3Yo5/CHJXDJfOHVfrgA1GYQMDHgyjFDqsjGoogTJcU5Mw2JexsSU2tsTGltjYEhtb4v9gH9wxNnE8riv2AAAAAElFTkSuQmCC",
"userDetails": "Name: anju, Adults: 2, Children: 1, Date: 2024-02-01, Amount: 200, Booking ID: AKM3245"},
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
