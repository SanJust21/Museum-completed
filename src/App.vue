<template>
  <router-view></router-view>
  <FooterPage />
</template>
<script>
import FooterPage from './components/FooterPage.vue';
import axios from 'axios'

export default {
  components: {
    FooterPage,
  },
  data() {
    return {
      ctg: []
    }
  },
  computed: {
    tax() {
      return this.$store.getters.getTax;
    },
    catg() {
      return this.$store.getters.getctg;
    }
  },
  methods: {
    // loadPrice() {
    //   const publicTickets = this.catg.filter(ticket => ticket.category === 'public');
    //   this.$store.commit('setPublic', publicTickets)
    //   console.log(publicTickets)
    //   const instituteTickets = this.catg.filter(ticket => ticket.category === 'institution');
    //   this.$store.commit('setInstitute', instituteTickets)
    //   console.log(instituteTickets)
    //   const foreignTickets = this.catg.filter(ticket => ticket.category === 'foreigner');
    //   this.$store.commit('setForeign', foreignTickets)
    //   console.log(foreignTickets)
    //   const tax = this.catg.filter(ticket => ticket.category === 'tax');
    //   this.$store.commit('setTax', tax)
    //   console.log(tax)

    // }
    async loadPrice() {
      try {
        const url = this.$store.getters.getUrl;
        const response = await axios.get(`${url}/api/details/loadPrice`);
        if (response.status === 200) {
          this.ctg = response.data;
          console.log(this.ctg)
          const publicTickets = this.ctg.filter(ticket => ticket.category === 'public');
          this.$store.commit('setPublic', publicTickets)
          console.log(publicTickets)
          const instituteTickets = this.ctg.filter(ticket => ticket.category === 'institution');
          this.$store.commit('setInstitute', instituteTickets)
          console.log(instituteTickets)
          const foreignTickets = this.ctg.filter(ticket => ticket.category === 'foreigner');
          this.$store.commit('setForeign', foreignTickets)
          console.log(foreignTickets)
          const tax = this.ctg.filter(ticket => ticket.category === 'tax');
          this.$store.commit('setTax', tax)
          console.log(tax)
        }
      }
      catch (error) {
        console.error(error)
      }
    },
  },

  mounted() {
    this.loadPrice();
  }

}

</script>
<style>
@import url('https://fonts.googleapis.com/css2? family= Noto+Sans+Malayalam:wght@800 & display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>

green
#74a965
light green
#536845
coral
#f0403a