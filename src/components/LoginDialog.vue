<template>
  <v-dialog
    persistent
    transition="dialog-top-transition"
    class="py-8 px-6 text-center mx-auto ma-4"
    elevation="2"
    max-width="400"
    width="100%"
    height="550"
  >
    <template v-slot:activator="{ props }">
      <v-btn
        color="#74a965"
        class="btn rounded-5"
        v-bind="props"
      >Book Tickets</v-btn>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card-actions class="justify-end">
        <v-icon 
          class="mdi mdi-close-circle-outline text-white fs-3"  @click="isActive.value = false, $router.push('/')">
        </v-icon>
      </v-card-actions>
      <v-card
        class="py-8 px-6 text-center mx-auto "
        elevation="2"
        max-width="400"
        width="100%"
        height="450">
      <v-card-text>
        <router-view></router-view>
      </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>
