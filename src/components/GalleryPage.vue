
   <template>
    <div class="d-flex flex-wrap mx-auto">
    <div v-for="gal in gallery" :key="gal.name" class="ms-4" >
      <v-card class="mx-4 my-5" width="344">
        <v-img :src="gal.image" height="200px" cover></v-img>
  
        <v-card-title >{{ gal.name }}</v-card-title>
  
        <!-- <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :icon="gal.show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="toggleShow(gal)"  color="white"></v-btn>
        </v-card-actions>
  
        <v-expand-transition>
          <div v-show="gal.show">
          
            <v-card-text class=" text-justify" >{{ gal.description }}</v-card-text>
          </div>
        </v-expand-transition> -->
      </v-card>
    </div>
</div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        gallery: [
          {
            image: require("@/assets/gallery2.jpg"),
            name: "Kerala heritage museum  ",
            description:
              "I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.",
            show: false, // Add show property to each gallery item
          },
          {
            image: require("@/assets/gallery4.jpeg"),
            name: "Kerala traditional painting",
            description:
              "I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.",
            show: false, // Add show property to each gallery item
          },
          {
            image: require("@/assets/gallery5.jpeg"),
            name: "Kerala Folklore Museum",
            description:
              "I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.",
            show: false, // Add show property to each gallery item
          },
          {
            image: require("@/assets/gallery6.jpg"),
            name: "Travancore Painters",
            description:
              "I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.",
            show: false, // Add show property to each gallery item
          },
          {
            image: require("@/assets/gallery7.jpg"),
            name: "Kerala Folklore Museum",
            description:
              "I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.",
            show: false, // Add show property to each gallery item
          },
          {
            image: require("@/assets/gallery8.jpeg"),
            name: "Cultural musical museum",
            description:
              "I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.",
            show: false, // Add show property to each gallery item
          },
          {
            image: require("@/assets/gallery6.jpg"),
            name: "Travancore Painters",
            description:
              "I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.",
            show: false, // Add show property to each gallery item
          },

        ],
      };
    },
    methods: {
      toggleShow(gal) {
        gal.show = !gal.show;
      },
    },
  };
  </script>
  <style scoped>
.v-btn{
  background-color: #1B5E20;
}
</style>
  