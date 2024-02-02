<template>
    <div class="row featurette my-5 mx-5" >
      <div class="col-md-7">
        <h2 class="featurette-heading fw-normal lh-1">Visit Us </h2><br>
        <p class="lead">Bus Stop, Mariyappally, <br>Moolavattom, Nattakom, Kerala-686013</p>
        <hr>
        <h2 class="featurette-heading fw-normal lh-1">Contact </h2><br>
        <p class="lead"><span class="mdi mdi-phone me-2"></span>Phone : +91-9876543210 , 0471-2275469</p>
      </div>
      <div class="col-md-5">
        <v-img src="@/assets/am1.jpeg" ></v-img>
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