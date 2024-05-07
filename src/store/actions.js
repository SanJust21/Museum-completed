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
                // const publicTickets = ctg.filter(ticket => ticket.category === 'public');
                // commit('setPublic', publicTickets);
                // const instituteTickets = ctg.filter(ticket => ticket.category === 'institution');
                // commit('setInstitute', instituteTickets);
                // const foreignTickets = ctg.filter(ticket => ticket.category === 'foreigner');
                // commit('setForeign', foreignTickets)
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
              return true;
          }
        }
        catch (error) {
          console.error(error)
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
        throw new Error(error.response.data.message);
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
          console.log(filteredIds);
          commit('setSlots', filteredIds);
          return true;
        }
      }
      catch (error) {
        console.error(error)
      }
  },
  //get slots by date
  async getSlotDate({ rootGetters, commit }, payload) {
    try
      {
        console.log('date clicked')
        const response = await axios.get(`${rootGetters.getUrl}/api/calEve/eventCal?date=${payload}&slotIds=1&slotIds=2&slotIds=3&slotIds=4&slotIds=6`);
        if (response.status === 200) {
          console.log(response.data);
          commit('setSelectedSlot', response.data)
        }
      }
      catch (error) {
        console.error(error)
      }
  },
  //lock slot
  async lockSlot({ rootGetters,commit}, payload) {
      const res = await axios.get(`${rootGetters.getUrl}/api/booking/lock?capacity=${payload.capacity}&visitDate=${payload.date}&slotName=${payload.slot}&category=${payload.cat}`)
        if (res.status === 200) {
          console.log('successfully locked')
          console.log(res.data)
          commit('setCapacityId', res.data);
          return true;
        }
  },
  //submit details
  async submitDetails({ rootGetters }, payload) {
    try {
     const url = rootGetters.getUrl;
     const response = await axios.post(`${url}/api/details/submit`, payload);
     if (response.status === 200) {
      return response.data.amount;
     }
    } 
    catch (error) {
      console.error(error);
    }
  },
  //create orderid with razorpay
  async createOrder({ rootGetters, commit }, payload) {
    try {
     const url = rootGetters.getUrl;
     const response = await axios.post(`${url}/api/payment/create-order`, payload);
      if (response.status === 200) {
        commit('setRazor', response.data)
        return true;
      }
    } 
    catch (error) {
      console.error(error);
    }
  }
}