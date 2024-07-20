<template>
    <v-empty-state headline="Whoops, 403" title="Forbidden" text="Your session must have timed out or you might not have permission to access this page. Please book
            tickets to continue." height="60vh">
        <div class="mx-auto">
            <v-btn color="green-darken-4" @click="$router.push('/')">Home</v-btn>
        </div>
    </v-empty-state>
</template>
<style scoped>
.text-wrapper {
    height: 80vh;
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