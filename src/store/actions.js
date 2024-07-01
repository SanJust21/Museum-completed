import axios from 'axios';
export default {
    //to filter public, institution & foreigner
    async loadPrice({ rootGetters, commit }) {
        try {
            const url = rootGetters.getUrl;
            const response = await axios.get(`${url}/api/details/loadPrice`);
            if (response.status === 200) {
              const ctg = response.data;
              console.log(ctg)
              const categorizedData = {};
              ctg.forEach(item => {
              if (!categorizedData[item.category]) {
                categorizedData[item.category] = {};
              }
              categorizedData[item.category][item.type] = item.price;
            });
              console.log(categorizedData);
                commit('setPricing', categorizedData);
              const tax = ctg.filter(ticket => ticket.category === 'tax');
              
                commit('setTax', tax)
            }
        }
        catch (error) {
            console.error(error)
        }
    },
    //to validate mobile and generate otp
    async generateOtp({ rootGetters, commit }, payload) {
        try {
          const url = rootGetters.getUrl;
          const response = await axios.post(`${url}/api/2factor/generate-otp`, {
              "mobileNumber": payload,
          });
          if (response.status === 200) {
              const messag = JSON.parse(response.data.message);
              commit('setMobile', response.data.mobileNumber);
            commit('setSession', messag);
            console.log('session', rootGetters.getsession)
              return true;
          }
        }
        catch (err) {
          console.log(err)
           throw Error(err.response? err.response.data : err.message);
        }
    },
    //validate otp
    async verifyOtp({rootGetters}, payload) {
      try {
        const url = rootGetters.getUrl;
        const response = await axios.post(`${url}/api/2factor/validate-otp`, {
          "enteredOtp": payload.otp,
          "sessionId": rootGetters.getsession.Details,
          "mobileNumber": payload.mobile
        });
        if (response.status === 200) {
           return true;
        }
      }
      catch (error) {
        console.log(error)
        if (error.response.data) {
          throw (error.response.data.message);
        }
        else throw (error.response.message)
        
      }
  },
     //get holiday
    async getHoliday({ rootGetters}) {
    const response = await axios.get(`${rootGetters.getUrl}/api/holidays/getDayList`);
      if (response.status === 200) {
        const dates = response.data.map(item => item.date)
        console.log(dates)
      return dates;
    }
  },
  //get all slots 
  async getSlots({ rootGetters, commit }) {
      try {
        const url = rootGetters.getUrl;
        const response = await axios.get(`${url}/api/stime/getSlot`);
        if (response.status === 200) {
           const filteredIds = response.data
            .filter(obj => obj.status === true)
            .map(obj => obj.id);
          commit('setSlots', filteredIds);
          return true;
        }
      }
      catch (error) {
        console.log(error);
        
      }
  },
  //get slots by date
  async getSlotDate({ rootGetters, commit }, payload) {
    try
    {
      const ids = rootGetters.getSlots.join(',');
      console.log('ids', ids)
        console.log('date clicked for slot')
        const response = await axios.get(`${rootGetters.getUrl}/api/calEve/eventCal?date=${payload}&slotIds=${ids}`);
        if (response.status === 200) {
          console.log('response from backend fore selected date',response.data);
          const data = response.data.sort((a, b) => a.id - b.id);
          commit('setSelectedSlot', data)
          return data;
        }
      }
    catch (error) {
      console.log(error)
        throw error.message
      }
  },
  //lock slot
  async lockSlot({ rootGetters,commit}, payload) {
      const res = await axios.get(`${rootGetters.getUrl}/api/booking/lock?capacity=${payload.capacity}&visitDate=${payload.date}&slotName=${payload.slot}&category=${payload.cat}`)
        if (res.status === 200) {
          commit('setCapacityId', res.data);
          return true;
        }
  },
  //submit details
  async submitDetails({  rootGetters }, payload) {
    try {
     const url = rootGetters.getUrl;
     const response = await axios.post(`${url}/api/details/submit`, payload);
      if (response.status === 200) {
        
        console.log('submitted',response.data)
        const result = {
          amount: response.data.totalPrice,
          id: response.data.uniqueId
        };
        console.log('result', result)
      return result;
     }
    } 
    catch (error) {
      throw Error(error);
    }
  },
  //create orderid with razorpay
  async createOrder({ rootGetters, commit }, payload) {
    try {
     const url = rootGetters.getUrl;
     const response = await axios.post(`${url}/api/payment/create-order`, payload);
      if (response.status === 200) {
       
        console.log(response.data)
        commit('setRazor', response.data)
        return true;
      }
    } 
    catch (error) {
      console.log(error)
      throw Error(error);
    }
  }
}