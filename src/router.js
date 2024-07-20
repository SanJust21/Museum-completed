import { createWebHistory, createRouter } from "vue-router";
import store from './store';
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
        meta: { requiresAuth: true },
        children: [
          {
            path:'/date',
            alias: '/booking-page', 
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
            component: () => import('./components/ReviewPage.vue'),
            meta: { requiresAuth: true },
          },  
          {
            path: '/payment',
            meta: { requiresAuth: true },
            component : () => import('./components/RazorPayment.vue')
          },
          {
            path: '/ticket',
            meta: { requiresAuth: true },
            component: () => import('./components/TicketPage.vue')
          },    
          {
            path: '/loading_ticket',
            meta: { requiresAuth: true },
            component: () => import('./components/LoadingPage.vue'),
          },
          
        ],
      },
      {
        path: '/:notFound(.*)',
        component: () => import('./components/ErrorPage.vue')
      },
      {
        path: '/access-not-allowed',
        name: 'forbid',
        component: () => import('./components/ForbiddenPage.vue')
      },
      
    ],
    scrollBehavior(_, _2, savedPosition) {
      if (savedPosition) {
          return savedPosition;
      }
      return {left: 0, top: 0};
  },
    
});
router.beforeEach((to, _2, next) => {
  const token = store.getters.getsession;

  if (to.meta.requiresAuth) {
    if (!token) {
      next({name:'forbid'});
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;