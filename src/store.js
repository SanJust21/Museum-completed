import {createStore} from 'vuex';
const store = createStore({
  state() {
    return{ 
      mobile: sessionStorage.getItem('mobile')|| null,
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
      details: JSON.parse(sessionStorage.getItem('details')) || {},
      razordetails: null,
      pubPrice: [],
      forPrice: [],
      instPrice: [],
      snrPrice: [],
      tax: [],
      category: sessionStorage.getItem('category') || null,
      date: null,
      qrDetails: {"qrCodeImage": "iVBORw0KGgoAAAANSUhEUgAAASwAAAEsAQAAAABRBrPYAAACRklEQVR4Xu2WwY7kIAxEzYnP4E8h/ad8wh45xVNVpHu3mdXOXEarWFgocuzXLaUok5h/J37ZWvlrbGyJjS2xsSU2tsTGlvgJ7DRGteLDau68ySi/kkCYio1pb6Pg9si4ZUWtSFi33Cu6BqYn79UKyAqVQmJWHi9BxMfFLA24+tr0B2WJh/llb9Wfsnw2+f0xY1Ro8r5YjYVdMWjyyTfH2fW7EwaDIAmWRn1YG7R6nRPNn8TCMpcUoCDJJ4O3cGE7EMZbiqAjS0m6VMJoh8L47IQhhnyeeXC59+mBYNgxH58mLxThOdqN/UBY5tfFodfQTFyMyfyRMOf8otinz5NgANRH3TAYBDE9+DkVGEVNDrXECYRJDZkc+05NGov0edMPwmBOSxcw4NsolALjPJhTn0jYsKRnhxrgnV1avQ2blgiD4akPzC9HGC1ejUcZvqmK/iUSpmdXJCYka+YsH2+C3B7zUXB5vE5mnVdM4HP1w2ConBpkdg2fT3K40wDBMOcxxSl2OpyFSwqOeShsisB9l8mrPD8FqX/Owv0xZwvGZh2zfFhB7TBjHg2jFMY3L3nZgFv/+OSQu2OnDistDfKEkYOPhTn8bJrfafi56bgsJo+AXUDjdhfX9eRxzdwDYScVwMuI67n1net9nCNgzHuTycFYZg5A9WAYD+fmEkE6nNx38DGxiroV59nFN1GCAXgbF2P3Yo5/CHJXDJfOHVfrgA1GYQMDHgyjFDqsjGoogTJcU5Mw2JexsSU2tsTGltjYEhtb4v9gH9wxNnE8riv2AAAAAElFTkSuQmCC",
                "userDetails": "Name: anju, Adults: 2, Children: 1,  Date: 2024-02-01, Amount: 200, Booking ID: pay_NVhx"},
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
      // sessionStorage.setItem('date', payload);
    },
    setBdate(state, payload) {
      state.bookDate = payload;
      sessionStorage.setItem('bookDate', payload);
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
      // console.log(sessionStorage.getItem('origDate'))
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
    getOrigDate(state) {
      const origDateStr = state.origDate;
    if (origDateStr) {
        return new Date(origDateStr);
    } else {
        return null; // Handle if origDate is null or undefined
    }
    }
  },
});
export default store;
