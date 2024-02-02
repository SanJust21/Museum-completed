<template>
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
<div class="mx-5 mb-5">
  <h3 class="text-center mb-4" style="text-decoration: underline;">Aksharam Museum</h3>

<p class="content">
Aksharam Museum is a comprehensive project initiated by the Cooperative Society of Literary Practitioners under the leadership of the Cooperation Department of the Kerala Government. With financial assistance from the state government in 2020, this literary cooperative venture is being realized in Kottayam, near the cultural capital of Kerala.

The Kerala government has allocated funds for this project in the 2020 State Budget, demonstrating its commitment to literature, culture, and heritage.

Aksharam Museum, similar to a museum dedicated to letters and literature, is a unique initiative not seen elsewhere in India. This museum is being constructed in Kottayam, Kerala, with the leadership of the Cooperative Society of Literary Practitioners. The Kerala government's financial support plays a crucial role in bringing this project to fruition.

Aksharam Museum is dedicated to literature, language, and culture, contributing to the promotion of these aspects. Like Aksharam Museum, there is no other institution in India with a similar purpose. Utilizing the possibilities of modern technology, the museum is being built on a sprawling campus covering twenty acres.

The project aims to complete Aksharam Museum in four phases. Alongside the museum, facilities like a library and research center are planned. The project encompasses various fields such as epigraphy, museology, archiving, and conservation. Study and training programs related to these areas, including printing, are also part of the ambitious plan.

In an international perspective, the project emphasizes the study and practices of epigraphy, museology, archiving, conservation, and printing. The aim is to create a holistic cultural and educational space that aligns with modern technological advancements.</p>
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
    .content{
      font-size: 17px;
      text-align: justify;
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