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
    },
  },
  mounted() {
    this.loadPrice();
    this.$store.dispatch('getSlots');
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
