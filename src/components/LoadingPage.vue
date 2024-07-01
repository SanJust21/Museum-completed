<template>

    <div class="text-center" style="height: 100vh;">
        <!-- <v-btn append-icon="mdi-open-in-new" color="deep-purple-accent-4" @click="overlay = !overlay">
            Launch Application
        </v-btn> -->
        <v-empty-state action-text="Retry Request" v-if="error"
            image="https://cdn.vuetifyjs.com/docs/images/components/v-empty-state/connection.svg"
            text="There might be a problem with your connection or our servers. Please check your internet connection or try again later. We appreciate your patience."
            title="Something Went Wrong" @click:action="getTicket"></v-empty-state>
        <v-overlay :model-value="overlay" class="align-center justify-center" persistent>
            <div class="text-center fst-italic " v-if="!error">
                <p>Please wait while the ticket is being generated. <br> Do not refresh the page.</p>
                <v-progress-circular color="primary" size="64" indeterminate></v-progress-circular>
            </div>

            <!-- <div v-else>Something went wrong. <a href="#" @click.prevent="getTicket">Retry</a> </div> -->
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
                this.error = false;
                this.overlay = true;
                const response2 = await axios.post(`${this.$store.getters.getUrl}/api/qr/book`, { "paymentid": this.payId });
                if (response2.status === 200) {
                   
                    this.$store.commit('setQR', response2.data);
                    console.log('session',sessionStorage.getItem('payment_id'))
                    this.$router.push('/ticket')
                }
            }
            catch (err) {
                this.error = true;
                this.overlay = false
                console.error(err)
            }
        }
    }
  }
</script>
