<template>
  <div class="container-fluid cover">
    <nav class="d-flex justify-content-between container-fluid">
      <div class="d-flex mt-md-3 mt-sm-1">
        <v-img src="@/assets/logo.png" class="image"></v-img>
        <div class="d-flex flex-column justify-content-lg-center ">
          <h1 class="logo-h1">അക്ഷരം</h1>
          <p class="logo-p">Museum of letters, literature<br> & culture</p>
        </div> 
        </div>
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid d-flex justify-content-end">
          <button class="navbar-toggler py-1" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" style="outline: none;">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent" style="width: fit-content;">
            <ul class="navbar-nav mb-2 mb-lg-0 d-flex align-items-end">
              <li class="nav-item me-lg-5 text-white m-md-0 my-2 fs-5" @click="$router.push('/')">
               Home
             </li>
             <li class="nav-item me-lg-5 text-white m-md-0 my-2 fs-5"  @click="$router.push('/gallery-page')">
               Gallery
             </li>
             <li class="nav-item me-lg-5 text-white m-md-0 my-2 fs-5"  @click="$router.push('/about-page')">
               About
             </li>
             <li class="nav-item me-lg-5 text-white m-md-0 my-2 fs-5"  @click="$router.push('/contact-page')">
               Contact
             </li>
             <li>
               <h5><TermsConds/></h5>
             </li>
           </ul>
          </div>
        </div>
     </nav>
      <!-- <div class="d-flex align-items-center me-3">
        <p class="me-sm-5 fs-5 text-white nav-text">About</p>
        <p class="me-sm-5 fs-5 text-white nav-text">Contact us</p> -->
     <!-- <LoginDialog/> -->
     <!-- <TermsConds/> -->

    <!-- </div>   -->
  </nav>
  <div class="d-flex lh-1 full-caption container-fluid pb-5 mb-5 ms-md-0 ps-md-0 pt-0 mt-0 align-items-center flex-wrap justify-content-xl-between justify-content-sm-center ">
    <p class="caption ">E</p>
    <div class="d-flex flex-column sub-caption lh-1 justify-content-center">
      <p>xplore</p>
      <p>xperience</p>
      <p>nchant</p>
    </div>
    <ImageRotate class="mt-0 mt-ms-2"/>
  </div>
</div>
<div class=" overflow-hidden py-5 mt-0 text-center bg-body-tertiary "  >
    <div class="col-md-12 p-lg-5 mx-auto my-5">
      <h1 class="display-3 p-2 fw-bold heading" v-motion-slide-visible-bottom>Unveiling the Tapestry of Tongues</h1>
      <h4 class="fw-normal text-muted mb-3 " v-motion-slide-visible-bottom>Embark on a linguistic and cultural odyssey at Aksharam, museum of letters, literature & culture! Plan your immersive journey now and unlock the secrets of Kerala's vibrant heritage. </h4>
       
      
      <div class="d-flex gap-3 justify-content-center lead fw-normal">
        <a class="icon-link text-decoration-none" href="#" style="color: #221d18;" >
          <b>Learn more &rarr;</b>
        </a>
      </div>
    </div>
  </div>

</template>

<script>
import ImageRotate from './ImageRotate.vue';
import TermsConds from './TermsConds.vue';

export default {
  components : {
    ImageRotate,
    TermsConds,

  },

  }
</script>


<style scoped>


    .logo-h1 {
        font-family: 'Noto Sans Malayalam', sans-serif;
        color: white;
        font-size: 24px;
        font-weight: 900;
        line-height: 16px;
    }
    .logo-p{
      color: white;
        font-size: 16px;
        line-height: 15px;
    }
    .button{
      background-color: #f0403a;
      height: 50px;
    }
    .contact{
      font-size: 10px;
    }
    .lib-images{
      height: 250px;
      opacity: 0.3;
      position: relative;
      z-index: 10;
    }
   
    .caption{
      font-size: 36vw;
      color: white;
      font-weight: 700;
      background-image: url('@/assets/museum.jpeg');
      background-image: url('@/assets/img2.jpg');
  background-size: cover;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 2px 2px #3a16055d;
    }
    .sub-caption{
      font-size: 6vw;
      color: white;
      font-weight: 400;
      background-image: url('@/assets/museum.jpeg');
      background-image: linear-gradient(to bottom right,white,#74a965aa);
  background-size: cover;
  background-position: center;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  letter-spacing: 3px;
    }


.cover{
  background-color: #221d18;
  background-image: linear-gradient(to bottom right,#110b03,#3e7132);
  height: 100%;
}
.image{
height: 120px;
width: 120px;
}
button{
  background-color:#74a965 !important ;
}
.full-caption{
  height: fit-content;
}
.nav-item {
  cursor: pointer ;
}
.heading{
  background-image: linear-gradient(to bottom right,rgb(43, 30, 8),#4d6032d9);
  /* background-image: url('@/assets/kerala.jpeg'); */
  background-size: cover;
  background-position: center;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  letter-spacing: 3px;
}
@media screen and (max-width: 1000px) {
  .image{
    height: 50px;
    width: 50px;
    margin-top: 10px;
  }
  .logo-h1{
    margin-top: 25px;
    font-size: 12px;
    line-height: 1px;
  }
  .logo-p{
    font-size: 8px;
    line-height: 8px;
  }
}

</style>