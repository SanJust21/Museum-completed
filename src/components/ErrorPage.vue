<template>
    <v-empty-state headline="Whoops, 404" title="Page not found"
        text="The page you were looking for does not exist or might have been removed or is temporarily unavailable."
        height="60vh">
        <p>Return to <router-link to="/"><i>Home Page.</i></router-link></p>
    </v-empty-state>
</template>