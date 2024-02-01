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
    <h3 class="text-center mb-4" style="text-decoration: underline;">Terms And Conditions</h3>
<p>


1. **Admission Policies:**
   - All visitors must purchase a valid admission ticket for entry.
   - Children under a certain age may be admitted for free or at a reduced rate.
   - Special rates may be available for seniors, students, and group visits.

2. **Visitor Conduct:**
   - Visitors are expected to conduct themselves respectfully towards exhibits, staff, and other visitors.
   - Running, shouting, or any disruptive behavior is not allowed within the museum premises.
   - Touching artifacts or exhibits is strictly prohibited unless otherwise specified.

3. **Photography and Filming:**
   - Photography and filming may be allowed in designated areas. Flash photography may be restricted.
   - Tripods and professional camera equipment may require special permission.
   - Photography for commercial purposes must be approved in advance.

4. **Security Measures:**
   - All bags and personal items are subject to inspection upon entry.
   - Large bags, backpacks, or items deemed potentially harmful may need to be stored in designated areas.

5. **Guided Tours:**
   - Guided tours may be available at scheduled times. Advance booking may be required.
   - Follow tour guidelines provided by museum staff, including staying with the group.

6. **Educational Programs:**
   - Educational programs may be available for schools and groups. Advance booking is recommended.
   - Teachers and group leaders are responsible for the behavior of their students or group members.

7. **Lost and Found:**
   - The museum is not responsible for lost or stolen items.
   - Found items should be reported to museum staff and will be held at the lost and found area.

8. **Health and Safety:**
   - Smoking, vaping, or the use of any open flames is prohibited.
   - Emergency exits and evacuation routes are clearly marked. Visitors should familiarize themselves with emergency procedures.

9. **Exhibit Restrictions:**
   - Some exhibits may have age or height restrictions. Follow posted guidelines.
   - Food and beverages are typically not allowed near exhibits.

10. **Cancellation and Refund Policies:**
    - Refunds for admission tickets may be available under certain circumstances.
    - Cancellations for guided tours or educational programs may require advance notice.

11. **Accessibility:**
    - The museum strives to provide accessibility for all visitors. Inquire about available services for visitors with disabilities.

These are general terms and conditions and may need to be adapted based on the specific policies and features of your museum. Always consult with legal and museum professionals to ensure compliance with local regulations and best practices.
</p>
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
