<template>
  <v-responsive>
    <nav class="d-flex justify-content-between container-fluid"
      style="background-image: linear-gradient(to bottom right,#110b03,#3e7132);">
      <div class="d-flex mt-sm-3 mt-2 logo" @click="$router.push('/')">
        <v-img src="@/assets/logo.png" class="image"></v-img>
        <div class="d-flex flex-column justify-content-sm-center mt-sm-0 mt-1">
          <h1 class="logo-h1 mb-sm-1 mb-0">അക്ഷരം</h1>
          <p class="logo-p lh-1">Museum of letters, literature<br> & culture</p>
        </div>
      </div>
      <!-- <nav class="navbar navbar-expand-lg">
        <div class="container-fluid d-flex justify-content-end">
          <button class="navbar-toggler p-1" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button> -->
      <!-- <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mb-2 mb-lg-0 d-flex align-items-end">
              <router-link to="/">
                <li class="nav-item me-lg-5 text-white m-md-0 my-2 fs-5"> Home</li>
              </router-link>
              <router-link to="/gallery-page">
                <li class="nav-item me-lg-5 text-white m-md-0 my-2 fs-5">
                  Gallery
                </li>
              </router-link>
              <router-link to="/about-page">
                <li class="nav-item me-lg-5 text-white m-md-0 my-2 fs-5" @click="$router.push('/about-page')">
                  About
                </li>
              </router-link>
              <router-link to="/contact-page">
                <li class="nav-item me-lg-5 text-white m-md-0 my-2 fs-5" @click="$router.push('/contact-page')">
                  Contact
                </li>
              </router-link>
            </ul>
          </div> -->
      <!-- </div>
      </nav> -->
    </nav>
    <router-view></router-view>
  </v-responsive>
</template>

<style scoped>
.logo-h1 {
        font-family: 'Noto Sans Malayalam', sans-serif;
        color: white;
        /* font-size: 20px; */
        font-size: clamp(0.8rem, 3vw, 1.3rem);
        font-weight: 900;
        line-height: 16px;
    }
    .logo-p{
      color: white;
        /* font-size: 12px; */
        font-size: clamp(0.4rem, 3vw, 0.8rem);
        line-height: 11px;
    }
    .logo{
      cursor: pointer;
    }
    .image{
/* height: 80px;
width: 80px; */
height: clamp(55px, 10vw, 80px);
  /* Height scaled between 40px and 80px */
  width: clamp(55px, 10vw, 80px);
  /* Width scaled between 40px and 80px */

}
.nav-item,a {
  cursor: pointer;
  text-decoration: none;
}
.nav-item:hover{
  transform: scale(1.1);
  color: rgb(193, 193, 9) !important;
}
a.router-link-active li {
  color: rgb(193, 193, 9) !important;
  transform: scale(1.1);
}
/* @media screen and (max-width: 1000px) {
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
} */
</style>