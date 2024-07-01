<template>
    <div class="text-wrapper d-flex flex-column justify-content-center">
        <div class="title text-center">
            <span style="font-size: 8rem; color:#B71C1C">403</span> <br>ACCESS DENIED
        </div>
        <div class="subtitle">
            Oops, You don't have permission to access this page.
        </div>
        <router-link class="button" to="/admin"><v-btn variant="elevated" color="blue-grey-darken-2"
                class="mt-4">Login</v-btn></router-link>

    </div>
</template>
<style scoped>
.text-wrapper {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.title {
    font-size: 5em;
    font-weight: 700;
    /* color: #EE4B5E; */
}

.subtitle {
    font-size: 20px;
    font-weight: 300;
    color: #0e1213;
}
</style>