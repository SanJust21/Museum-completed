import { createWebHistory, createRouter } from "vue-router";
const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        component: () => import('./components/HomePage.vue'),
        children: [
          {
            path:'/login/entermobile',
            alias: '/',
            component: () => import('./components/MobileEnter.vue')
          },
          {
            path:'/otp',
            component: () => import('./components/OtpPage.vue')
          },
        ]
      },
      {
        path: '/booking-page',
        component: () => import('./components/BookingPage.vue'),
        children: [
          {
            path:'/date',
            alias: '/booking-page', //to view this calendar when page loads
            component: () => import('./components/DateFix.vue'),
            children : [
              {
                path:'/public-details-enter',
                component: () => import('./components/PublicDetails.vue')
              },
              {
                path:'/institution-details-enter',
                component: () => import('./components/StudentDetails.vue')
              },
              {
                path:'/foreigner-details-enter',
                component: () => import('./components/ForeignerDetails.vue')
              }
            ]
          },
          {
            path:'/review-details',
            component: () => import('./components/ReviewPage.vue')
          },  
          {
            path: '/payment',
            component : () => import('./components/RazorPayment.vue')
          },
          {
            path: '/ticket',
            component: () => import('./components/TicketPage.vue')
          },   
          {
            path: '/about-page',
            component: () => import('./components/AboutPage.vue'),   
          },
          {
            path: '/contact-page',
            component: () => import('./components/ContactPage.vue'),
          },
          {
            path: '/terms-page',
            component: () => import('./components/TermsPage.vue'),   
          },
          {
            path: '/copyright-page',
            component: () => import('./components/CopyRight.vue'),   
          },  
          {
            path: '/gallery-page',
            component: () => import('./components/GalleryPage.vue'),   
          },   
          
       
        ]
      },
    ]
});
export default router;