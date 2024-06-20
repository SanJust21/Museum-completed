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
    width: 550px;
    height: 400px;
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
    top:35px;
    z-index: 1;
    transform: translateX(-1%);
    transform: scale(1.3); 
}
.image.right {
    right: 0;
    bottom:35px;
    z-index: 3;
    transform: translateX(1%);
    transform: scale(1.3); 
}
@media screen and (min-width: 1600px) and (max-width: 2160px) {
.image-container {
        width: 550px;
        height: 450px;
    }

    .image {
        width: 150px;
        height: 200px;
    }
}
@media screen and (min-width: 1400px) and (max-width: 1600px) {
    .image-container {
        width: 550px;
        height: 380px;
    }
}
@media screen and (min-width: 1000px) and (max-width: 1400px) {
    .image-container {
        width: 500px;
        height: 350px;
    }
    .image {
        width: 135px;
        height: 180px;
    }
}
@media screen and (min-width: 720px) and (max-width: 1000px) {
    .image-container {
        width: 380px;
        height: 250px;
    }

    .image {
        width: 120px;
        height: 155px;
        border-radius: 0px 45px 0px 35px;
    }
        .image.left {
            top: 0;
        }
                  .image.middle {
                      top: 15%;
                  }
        .image.right {
            bottom: 8%;
        }
}
@media screen and (min-width: 500px) and (max-width: 720px) {
    .image-container {
        width: 230px;
        height: 210px;
    }
    .image {
        width: 70px;
        height: 94px;
        border-radius: 0px 35px 0px 25px;
    }
    .image.left {
        top: 30px;
    }
    .image.right {
        bottom: 45px;
    }
}

@media screen and (min-width: 450px) and (max-width: 500px) {
    .image-container {
        width: 210px;
        height: 240px;
    }
    .image {
        width: 70px;
        height: 94px;
        border-radius: 0px 35px 0px 25px;
    }
    .image.right {
        bottom: 55px;
    }
}
@media screen and (min-width: 200px) and (max-width: 450px) {
    .image-container {
        width: 210px;
        height: 180px;
    }

    .image {
        width: 70px;
        height: 88px;
        border-radius: 0px 35px 0px 25px;
    }
         .image.left {
             top: 0;
         }
.image.middle {
    
    top: 15%;

}
    .image.right {
        bottom: 20%;
    }
}
</style>