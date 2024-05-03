<template>
    <div class="text-center" style="height: 500px;">
        <!-- <v-btn append-icon="mdi-open-in-new" color="deep-purple-accent-4" @click="overlay = !overlay">
            Launch Application
        </v-btn> -->

        <v-overlay :model-value="overlay" class="align-center justify-center">
            <div v-if="!error" class="text-center fst-italic ">
                <p>Please wait while the ticket is being generated</p>
                <v-progress-circular  color="primary" size="64" indeterminate></v-progress-circular>
            </div>
            
            <div v-else>Something went wrong. <a href="#" @click.prevent="getTicket">Retry</a> </div>
        </v-overlay>
    </div>
</template>

<script>
import axios from 'axios';
    export default {
        data: () => ({
            overlay: true,
            error:false
    }),

    // watch: {
    //     overlay(val) {
    //     val && setTimeout(() => {
    //         this.overlay = false
    //     }, 3000)
    // },
    // },
    computed: {
        payId() {
            return this.$store.getters.getPayment;
        }
    },
    mounted() {
        this.getTicket();
    },
    methods: {
        async getTicket() {
            try {
                const response2 = await axios.post(`${this.$store.getters.getUrl}/api/qr/book`, { "paymentid": this.payId });
                if (response2.status === 200) {
                    sessionStorage.clear();
                    this.$store.commit('setQR', response2.data);
                    console.log('session',sessionStorage.getItem('payment_id'))
                    this.$router.push('/ticket')
                }
            }
            catch (err) {
                console.error(err)
            }
        }
    }
  }
</script>
