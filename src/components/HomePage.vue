<template>
  <div class="container-fluid px-0 cover">
    <nav class="d-flex justify-content-between align-items-center container-fluid p-0 ">
      <div class="d-flex pt-md-3 pt-sm-3 pt-2 ms-md-2 ms-0 ps-sm-4 ps-2 pb-md-3 pb-sm-2">
        <v-img src="@/assets/logo.png" class="image"></v-img>
        <div class="d-flex flex-column justify-content-lg-center mt-2">
          <h1 class="logo-h1 mb-md-1 mb-0">അക്ഷരം</h1>
          <p class="logo-p lh-1">Museum of letters, literature<br> & culture</p>
        </div>
      </div>
      <div class="me-sm-5 me-sm-4 me-3">
        <TermsConds />
      </div>

      <!-- <nav class="navbar navbar-expand-lg">
        <div class="container-fluid d-flex justify-content-end"> -->
      <!-- <button class="navbar-toggler py-1" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" style="outline: none;">
            <span class="navbar-toggler-icon"></span>
          </button> -->
      <!-- <div class="collapse navbar-collapse" id="navbarSupportedContent" style="width: fit-content;"> -->
      <!-- <ul class="navbar-nav mb-2 mb-lg-0 d-flex align-items-end"> -->
      <!-- <li class="nav-item me-lg-5 text-white m-md-0 my-2 fs-5" @click="$router.push('/')">
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
             </li> -->
      <!-- <li>
               <h5><TermsConds/></h5>
             </li>
           </ul>
          </div> -->
      <!-- </div> -->
      <!-- </nav> -->
    </nav>
    <div
      class="d-flex lh-1 full-caption container-fluid ms-md-0 pb-md-5 pb-sm-4 ps-md-5 pt-0 mt-0 align-items-center flex-wrap  justify-md-content-between justify-content-center gap-3">
      <!-- <p class="caption ">E</p>
      <div class="d-flex flex-column sub-caption lh-1 justify-content-center ">
        <p class="mb-lg-4 mb-md-3 mb-2 mt-sm-5">xplore</p>
        <p class="mb-lg-4 mb-md-3 mb-2 mt-sm-5">xperience</p>
        <p class="mt-sm-5 mb-md-4">nchant</p>
      </div> -->
      <div class="d-flex">
        <p class="caption mt-0">E</p>
        <div class="d-flex flex-column sub-caption lh-1 justify-content-center ">
          <p class="">xplore</p>
          <p class="">xperience</p>
          <p class="">nchant</p>
        </div>
      </div>
      <ImageRotate class="mt-0" />
    </div>
  </div>
  <div class=" overflow-hidden mt-0 text-center bg-body-tertiary ">
    <div class="col-md-12 p-lg-5 p-md-5 mx-auto my-5">
      <h1 class="display-3 p-2 fw-bold heading mx-lg-4">Unveiling the Tapestry of Tongues</h1>
      <h4 class="fw-normal text-muted mb-3 mx-sm-4 px-3">Embark on a linguistic and cultural odyssey
        at Aksharam, museum of letters, literature & culture! Plan your immersive journey now and unlock the secrets of
        Kerala's vibrant heritage. </h4>
      <div class="d-flex gap-3 justify-content-center lead fw-normal">
        <a class="icon-link text-decoration-none" style="color: #221d18;">
          <TermsConds />
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
  font-weight: 900;
  line-height: 16px;
  font-size: clamp(0.8rem, 3vw, 1.5rem);
}
.logo-p{
  color: white;
  font-size: clamp(0.4rem, 3vw, 1rem);
  line-height: 11px;
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
  background-image: linear-gradient(to bottom right,white,#74a965aa);
  background-size: cover;
  background-position: center;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  letter-spacing: 3px;
}
/* .sub-caption > p{
  margin-bottom: 5%;
} */

.nav-item:hover{
  transform: scale(1.1);  
  color: rgb(193, 193, 9) !important;
}
a.router-link-active li {
  color: rgb(193, 193, 9) !important;
  transform: scale(1.1);
}
.cover{
  background-color: #221d18;
  background-image: linear-gradient(to bottom right,#110b03,#3e7132);
  height: 100%;
}
.image{
  height: clamp(55px, 15vw, 95px);
  width: clamp(55px, 15vw, 95px);
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
.icon-link {
  cursor: pointer ;
}
.heading{
  background-image: linear-gradient(to bottom right,rgb(43, 30, 8),#4d6032d9);
  background-size: cover;
  background-position: center;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  letter-spacing: 3px;
}
@media screen and (max-width: 3840px) {
  .sub-caption p:nth-child(1) {
    margin-top: 10%
  }

  .sub-caption p:nth-child(2) {
    margin-top: 15%
  }

  .sub-caption p:nth-child(3) {
    margin-top: 15%;
    margin-bottom: 0;
  }
}
@media screen and (max-width: 2440px) {
  .sub-caption p:nth-child(1) {
    margin-top: 10%
  }

  .sub-caption p:nth-child(2) {
    margin-top: 15%
  }

  .sub-caption p:nth-child(3) {
    margin-top: 15%;
    margin-bottom: 0;
  }
}
@media screen and (max-width: 1610px) {
  .sub-caption p:nth-child(2) {
    margin-top: 12%
  } 

  .sub-caption p:nth-child(3) {
    margin-top: 12%;
  
  }
}
@media screen and (max-width: 1340px) {
  .sub-caption p:nth-child(1) {
      margin-top: 6%;
    }
  .sub-caption p:nth-child(2) {
    margin-top: 13%
  }
  .sub-caption p:nth-child(3) {
    margin-top: 12%;
  }
}
@media screen and (max-width: 1170px) {
  .sub-caption p:nth-child(1) {
    margin-top: 6%;
  }

  .sub-caption p:nth-child(2) {
    margin-top: 13%
  }

  .sub-caption p:nth-child(3) {
    margin-top: 12%;
  }
}
@media screen and (max-width: 970px) {
  .sub-caption p:nth-child(1) {
    margin-top: 5%;
  }

  .sub-caption p:nth-child(2) {
    margin-top: 5%
  }

  .sub-caption p:nth-child(3) {
    margin-top: 5%;
    
  }
}
@media screen and (min-width: 840px) and (max-width: 970px) {
  .sub-caption p:nth-child(1) {
    margin-top: 6%;
  }

  .sub-caption p:nth-child(2) {
    margin-top: 10%
  }

  .sub-caption p:nth-child(3) {
    margin-top: 12%;

  }
}
@media screen and (min-width: 680px) and (max-width: 840px) {
  .sub-caption p:nth-child(1) {
    margin-top: 6%;
  }

  .sub-caption p:nth-child(2) {
    margin-top: 8%
  }

  .sub-caption p:nth-child(3) {
    margin-top: 9%;

  }
}
/* @media screen and (max-width: 860px) {
  .sub-caption p:nth-child(1) {
    margin-top: 0;

  }

  .sub-caption p:nth-child(2) {
    margin-top: 12%
  }

  .sub-caption p:nth-child(3) {
    margin-top: 10%;

  }
} */
/* @media screen and (max-width: 690px) {
  .sub-caption p:nth-child(1) {
    margin-top: 0;
  }

  .sub-caption p:nth-child(2) {
    margin-top: 6%
  }

  .sub-caption p:nth-child(3) {
    margin-top: 8%;

  }
} */
@media screen and (max-width: 546px) {
  .sub-caption p:nth-child(1) {
    margin-top: 0;
  }
  .sub-caption p:nth-child(2) {
    margin-top: 4%
  }
  .sub-caption p:nth-child(3) {
    margin-top: 2%;

  }
}
@media screen and (max-width: 390px) {
  .sub-caption p:nth-child(1) {
    margin-top: 0;
  }

  .sub-caption p:nth-child(2) {
    margin-top: 4%
  }

  .sub-caption p:nth-child(3) {
    margin-top: 2%;

  }
}
@media screen and (max-width: 370px) {
  .sub-caption p:nth-child(1) {
    margin-top: 0;
  }

  .sub-caption p:nth-child(2) {
    margin-bottom: 15%
  }

  .sub-caption p:nth-child(3) {
    margin-bottom: 10%;

  }
}
@media screen and (max-width: 377px) {

  .sub-caption p:nth-child(1) {
    margin-top: 10px;
      margin-bottom: 1%;
    }
  .sub-caption p:nth-child(2) {
    margin-top: 12%;
  }

  .sub-caption p:nth-child(3) {
    margin-bottom: 10%;

  }
}
</style>

 