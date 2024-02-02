<template>
  <nav class="d-flex justify-content-between container-fluid" style="background-image: linear-gradient(to bottom right,#110b03,#3e7132);">
      <div class="d-flex mt-md-3 mt-sm-1">
        <v-img src="@/assets/logo.png" class="image"  @click="$router.push('/')"></v-img>
        <div class="d-flex flex-column justify-content-lg-center ">
          <h1 class="logo-h1">അക്ഷരം</h1>
          <p class="logo-p">Museum of letters, literature<br> & culture</p>
        </div> 
        </div>
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid d-flex justify-content-end">
          <button class="navbar-toggler p-1" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mb-2 mb-lg-0 d-flex align-items-end">
              <li class="nav-item me-lg-5 text-white m-md-0 my-2 fs-5" @click="$router.push('/')">
               Home
             </li>
             <li class="nav-item me-lg-5 text-white m-md-0 my-2 fs-5"  @click="$router.push('/gallery-page')">
               Gallery
             </li>
             <li class="nav-item me-lg-5 text-white m-md-0 my-2 fs-5" @click="$router.push('/about-page')">
               About
             </li>
             <li class="nav-item me-lg-5 text-white m-md-0 my-2 fs-5" @click="$router.push('/contact-page')">
               Contact
             </li>
         </ul>
    </div>
  </div>
</nav>
  </nav>

<router-view></router-view>
  
</template>
    


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
    .image{
height: 120px;
width: 120px;
cursor: pointer;
}
.nav-item {
  cursor: pointer;
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