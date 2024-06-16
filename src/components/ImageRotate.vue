<template>
<div class="image-container container mt-lg-4 mt-0">
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
    height: 390px;
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
    top: 25%;
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
@media screen and (max-width: 1150px) {
    .image-container {
    width: 450px;
    height: 450px;
    }
    .image {
    width: 120px;
    height: 160px;
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
@media screen and (max-width: 550px){
    .image-container {
            width: 300px;
            height: 300px;
        }
.image {
        width: 80px;
        height: 100px;
        border-radius: 0px 45px 0px 40px;
    }
        .image.middle {
            z-index: 2;
            top: 35%;
            /* transfo2m: translateY(-50%); */
            transform: scale(1.3);
            /*  Adjust the scale for the zoom effect */
        }
    
        .image.left {
            left: 15%;
            top: 10%;
            transform: translateX(100%);
            transform: scale(1.3);
        }
    
        .image.right {
            right: 15%;
            top: 60%;
            transform: scale(1.3);
    
        }
}
</style>