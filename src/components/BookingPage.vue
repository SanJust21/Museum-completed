<template>
  <v-responsive>
    <div class="container-fluid px-0 cover">
      <nav class="d-flex justify-content-between align-items-center container-fluid p-0 gap-2">
        <div class="d-flex pt-md-3 pt-sm-3 pt-2 ms-md-2 ms-0 ps-sm-4 ps-2 pb-md-3 pb-sm-2 " @click="$router.push('/')" style="cursor: pointer;">
          <v-img src="@/assets/logo.png" class="image"></v-img>
          <div class="d-flex flex-column justify-content-lg-center mt-2">
            <h1 class="logo-h1 mb-md-1 mb-0">അക്ഷരം</h1>
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
    </div>
    <router-view></router-view>
  </v-responsive>
</template>

<style scoped>
.logo-h1 {
  font-family: 'Noto Sans Malayalam', sans-serif;
  color: white;
  font-weight: 900;
  line-height: 16px;
  font-size: clamp(0.8rem, 3vw, 1.5rem);
}

.logo-p {
  color: white;
  font-size: clamp(0.4rem, 3vw, 1rem);
  line-height: 11px;
}
.cover {
  background-color: #221d18;
  background-image: linear-gradient(to bottom right, #110b03, #3e7132);
}

.image {
  /* height: 80px;
width: 80px; */
  height: clamp(55px, 15vw, 80px);
  width: clamp(55px, 15vw, 80px);
}
    .logo{
      cursor: pointer;
    }
.image {
  height: clamp(55px, 15vw, 95px);
  width: clamp(55px, 15vw, 95px);
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