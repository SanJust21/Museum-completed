<template>
  <router-view></router-view>
  <FooterPage />
</template>

<script>
import FooterPage from './components/FooterPage.vue';
export default {
  components: {
    FooterPage,
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
    async loadPrice() {
      this.$store.dispatch('loadPrice')
      // try {
      //   const url = this.$store.getters.getUrl;
      //   const response = await axios.get(`${url}/api/details/loadPrice`);
      //   if (response.status === 200) {
      //     this.ctg = response.data;
      //     console.log(this.ctg)
      //     const publicTickets = this.ctg.filter(ticket => ticket.category === 'public');
      //     this.$store.commit('setPublic', publicTickets)
      //     console.log(publicTickets)
      //     const instituteTickets = this.ctg.filter(ticket => ticket.category === 'institution');
      //     this.$store.commit('setInstitute', instituteTickets)
      //     console.log(instituteTickets)
      //     const foreignTickets = this.ctg.filter(ticket => ticket.category === 'foreigner');
      //     this.$store.commit('setForeign', foreignTickets)
      //     console.log(foreignTickets)
      //     const tax = this.ctg.filter(ticket => ticket.category === 'tax');
      //     this.$store.commit('setTax', tax)
      //     console.log(tax)
      //   }
      // }
      // catch (error) {
      //   console.error(error)
      // }
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
