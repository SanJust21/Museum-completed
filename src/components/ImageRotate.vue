<template>
<div class="image-container container mt-4">
        <v-img class="image left" src="@/assets/museum2.jpeg" alt="Left Image"></v-img>
        <v-img class="image middle" src="@/assets/museum.jpeg" alt="Middle Image"></v-img>
        <v-img class="image right" src="@/assets/museum3.jpeg" alt="Right Image"></v-img>
    </div>
</template>
<style scoped>
.image-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 500px;
    height: 500px;
}

.image {
    width: 150px;
     /* Adjust the width as needed */
    height: 200px;
    position: absolute;
    transition: transform 0.3s ease-in-out;
    box-shadow: 0px 0px 8px rgba(46, 63, 2, 0.693);
    border-radius: 0px 55px 0px 35px;
}

.image.middle {
    z-index: 2;

    top: 30%;
    transform: translateY(-80%);
    transform: scale(1.3);
    /*  Adjust the scale for the zoom effect */
}

.image.left, .image.right {
   /* Adjust the width as needed */
  
    position: absolute;
    transform: translateY(-50%);
   
    transform: scale(1.5);
}

.image.left {
    left: 0;
    top:30px;
    z-index: 1;
    transform: translateX(-1%);
    transform: scale(1.3); 

}

.image.right {
    right: 0;
    bottom:30px;
    z-index: 3;
    transform: translateX(1%);
    transform: scale(1.3); 
}
@media screen and (max-width: 1200px) {
    .image {
    width: 100px;
    height: 130px;
}
.image.middle {
    z-index: 2;
    top: 30%;
    transform: translateY(-80%);
    transform: scale(1.3);
    /*  Adjust the scale for the zoom effect */
}
.image.left {
    left: 18%;
    top:10%;
    transform: translateX(100%);
    transform: scale(1.3);
}

.image.right {
    right: 18%;
   top: 50%;
   
    transform: scale(1.3);

}
}
</style>