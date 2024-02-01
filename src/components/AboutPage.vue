<template>

    <nav class="d-flex justify-content-between container-fluid mb-0" style="background-image: linear-gradient(to bottom right,#110b03,#3e7132);">
      <div class="d-flex mt-md-3 mt-sm-1" @click="$router.push('/')">
        <v-img src="@/assets/logo.png" class="image"></v-img>
        <div class="d-flex flex-column justify-content-lg-center">
          <h1 class="logo-h1">അക്ഷരം</h1>
          <p class="logo-p">Museum of letters, literature<br> & culture</p>
        </div>
      </div>
    </nav>
  
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
            <li class="nav-item me-lg-5 text-white m-md-0 my-2 fs-5">
              About
            </li>
            <li class="nav-item me-lg-5 text-white m-md-0 my-2 fs-5">
              Contact
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <v-carousel class="mt-0 mb-5">
  <v-carousel-item
    src="@/assets/am1.jpeg"
    cover
  ></v-carousel-item>

  <v-carousel-item
    src="@/assets/am2.jpg"
    cover
  ></v-carousel-item>

  <v-carousel-item
    src="@/assets/am3.jpg"
    cover
  ></v-carousel-item>
</v-carousel>
<!-- <h3 class="text-center mb-4">Aksharam Museum</h3> -->
<h3 class="text-center mb-4" style="text-decoration: underline;">Aksharam Museum</h3>

<p>
Aksharam Museum is a comprehensive project initiated by the Cooperative Society of Literary Practitioners under the leadership of the Cooperation Department of the Kerala Government. With financial assistance from the state government in 2020, this literary cooperative venture is being realized in Kottayam, near the cultural capital of Kerala.

The Kerala government has allocated funds for this project in the 2020 State Budget, demonstrating its commitment to literature, culture, and heritage.

Aksharam Museum, similar to a museum dedicated to letters and literature, is a unique initiative not seen elsewhere in India. This museum is being constructed in Kottayam, Kerala, with the leadership of the Cooperative Society of Literary Practitioners. The Kerala government's financial support plays a crucial role in bringing this project to fruition.

Aksharam Museum is dedicated to literature, language, and culture, contributing to the promotion of these aspects. Like Aksharam Museum, there is no other institution in India with a similar purpose. Utilizing the possibilities of modern technology, the museum is being built on a sprawling campus covering twenty acres.

The project aims to complete Aksharam Museum in four phases. Alongside the museum, facilities like a library and research center are planned. The project encompasses various fields such as epigraphy, museology, archiving, and conservation. Study and training programs related to these areas, including printing, are also part of the ambitious plan.

In an international perspective, the project emphasizes the study and practices of epigraphy, museology, archiving, conservation, and printing. The aim is to create a holistic cultural and educational space that aligns with modern technological advancements.</p>
<br>
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