<template>
  <div class="container-fluid mt-0 px-sm-4 px-3">
    <footer class="pt-3 pb-2 text-white">
      <div class="row px-md-4 d-flex justify-content-between ">
        <div class="col-sm-6 col mb-3">
          <h5 class="ms-2 head">Visit us</h5>
          <div class="d-flex">
            <v-icon class="mdi mdi-map-marker-outline mt-1 me-2" size="17"></v-icon>
            <p class="text-white details">Bus Stop, Mariyappally, Moolavattom, Nattakom, Kerala-686013</p>
          </div>
          <div class="d-flex">
            <v-icon class="mdi mdi-clock-outline mt-1 me-2" size="16"></v-icon>
            <p class="text-white details">Museum Hours:<br>10:00 AM to 6:00 PM<br> Closed on Mondays and Gazetted
              Holidays</p>
          </div>
        </div>
        <div class="col-sm-4 col  mb-3">
          <h5 class="text-end head"><v-icon class="mdi mdi-phone me-1 " size="16"></v-icon>Contact us</h5>
          <p class="text-white text-end details ms-3">+91-9876543210 | 0471-2275469</p>
        </div>
      </div>
      <div class="d-flex flex-column flex-sm-row justify-content-between align-items-end mb-3 border-top mx-md-3 mx-1">
        <p class="rights">© 2024 Aksharam Museum. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.container-fluid{
    background-image: linear-gradient(to bottom right,#3e7132, #221d18);
    /* background-color: #221d18; */
}
.rights{
  /* font-size: 12px; */
  font-size: clamp(0.5rem, 3vw, .8rem);
}
.details{
  font-size: clamp(0.7rem, 3vw, 1rem);
}
.nav-item , .cond{
  cursor: pointer ;
}
.cond:hover{
  transform: scale(1.1);
  color: rgb(193, 193, 9) !important;
}
a.router-link-active{
  color: rgb(193, 193, 9) !important;
  transform: scale(1.1);
}
.head{
  font-size: 20px;
}
@media screen and (max-width: 1000px) {
  .head {
    font-size: 18px;
  }
}
@media screen and (max-width: 430px){
  .head {
      font-size: 16px;
    }
}
@media screen and (max-width: 300px) {
  .head {
    font-size: 14px;
  }
}
</style>