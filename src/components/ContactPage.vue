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
             <li class="nav-item me-lg-5 text-white m-md-0 my-2 fs-5"  @click="$router.push('/about-page')">
               About
             </li>
             <li class="nav-item me-lg-5 text-white m-md-0 my-2 fs-5"  @click="$router.push('/contact-page')">
               Contact
             </li>
         </ul>
    </div>
  </div>
</nav>
</nav>
  
<!--     
      <h3 class="text-center ">Contact</h3> -->

    <div class="row featurette my-5 mx-5" >
      <div class="col-md-7">
        <h2 class="featurette-heading fw-normal lh-1">Visit Us </h2><br>
        <p class="lead">Bus Stop, Mariyappally, Moolavattom, Nattakom, Kerala-686013</p>
        <hr>
        <h5><span class="mdi mdi-phone"></span>Phone : +91-9876543210 , 0471-2275469</h5>
      </div>
      <div class="col-md-5">
        <v-img src="@/assets/am1.jpeg" ></v-img>
        <!-- <svg class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: aksharam museum" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="var(--bs-secondary-bg)"></rect><text x="50%" y="50%" fill="var(--bs-secondary-color)" dy=".3em"></text></svg> -->
      </div>
    </div>
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
}
.nav-item {
  cursor: pointer ;
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