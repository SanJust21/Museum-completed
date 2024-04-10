import axios from 'axios';
export default {
    //to filter public, institution & foreigner
    async loadPrice({ rootGetters }) {
        try {
            const url = rootGetters.getUrl;
            const response = await axios.get(`${url}/api/details/loadPrice`);
            if (response.status === 200) {
                const ctg = response.data;
                const publicTickets = ctg.filter(ticket => ticket.category === 'public');
                this.$store.commit('setPublic', publicTickets);
                const instituteTickets = ctg.filter(ticket => ticket.category === 'institution');
                this.$store.commit('setInstitute', instituteTickets);
                const foreignTickets = ctg.filter(ticket => ticket.category === 'foreigner');
                this.$store.commit('setForeign', foreignTickets)
                const tax = this.ctg.filter(ticket => ticket.category === 'tax');
                this.$store.commit('setTax', tax)
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
    }
    }