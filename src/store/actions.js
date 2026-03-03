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
  // Paste this into your Vuex store's actions object,
// replacing your existing createOrder action.

async createOrder({ rootGetters, commit }, payload) {
  try {
    const url = rootGetters.getUrl;
    const { categoryId, sessionId, payAmount } = payload;

    const response = await axios.post(
      `${url}/api/onlineBooking/makePayment`,
      {},
      {
        params: { categoryId, sessionId, payAmount },
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (response.status === 200 && response.data) {
      console.log('makePayment response:', response.data);

      // setRazor populates the store so RazorPayment.vue's created() hook
      // can safely read razorpayKeyId and other fields without getting null.
      commit('setRazor', response.data);

      return true;
    } else {
      throw new Error('makePayment failed — invalid response');
    }
  } catch (error) {
    console.error('createOrder action error:', error);
    throw error; // re-throw so confirm() in ReviewDetails.vue can catch & show snackbar
  }
},
    
    //get all categories
    async getAllCategories({ rootGetters, commit }) {
        try {
            const url = rootGetters.getUrl;
            const response = await axios.get(`${url}/api/category/getCategory`);
            if (response.status === 200) {
                commit('setCategories', response.data);
                return response.data;
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    },
    
    //get types by category ID
    async getTypesByCategoryId({ rootGetters, commit }, categoryId) {
        try {
            const url = rootGetters.getUrl;
            const response = await axios.get(`${url}/api/category/getTypeByCategoryId?id=${categoryId}`);
            if (response.status === 200) {
                commit('setCategoryTypes', response.data);
                return response.data;
            }
        } catch (error) {
            console.error('Error fetching types by category ID:', error);
            throw error;
        }
    },
    
    //get price data
    async getCategoryPrices({ rootGetters, commit }) {
        try {
            const url = rootGetters.getUrl;
            const response = await axios.get(`${url}/api/category/getPrice`);
            if (response.status === 200) {
                // Process the price data to match the existing format
                const categorizedData = {};
                response.data.forEach(item => {
                    if (!categorizedData[item.categoryName.toLowerCase()]) {
                        categorizedData[item.categoryName.toLowerCase()] = {};
                    }
                    categorizedData[item.categoryName.toLowerCase()][item.typeName.toLowerCase()] = item.price;
                });
                commit('setPricing', categorizedData);
                return response.data;
            }
        } catch (error) {
            console.error('Error fetching category prices:', error);
            throw error;
        }
    },
    
    //get slot by date
    async getSlotByDate({ rootGetters, commit }, date) {
  try {
    const url = rootGetters.getUrl;
    const response = await axios.get(
      `${url}/api/slot/bookDate?bDate=${date}&modeType=Online`
    );

    if (response.status === 200) {
      const slots = response?.data?.body || [];

      // ✅ Keep slots that are active (presentStatus: true)
      // and have remaining capacity (presentCapacity > 0)
      const availableSlots = slots
        .filter(slot => slot.presentStatus === true && slot.presentCapacity > 0)
        .map(slot => ({
          id: slot.slotId,
          startTime: slot.slotStartTime,
          endTime: slot.slotEndTime,
          capacity: slot.presentCapacity,
          totalCapacity: slot.totalCapacity,
          status: slot.presentStatus
        }));

      commit('setSelectedSlot', availableSlots);
      return availableSlots;
    }
  } catch (error) {
    console.error('Error fetching slots by date:', error);
    throw error;
  }
}
  }
