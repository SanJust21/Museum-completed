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
  component: () => import('./components/BookingPage.vue'), // ← this is the file above
  meta: { requiresAuth: true },
  children: [
    {
      path: '',
      alias: '/date',
      name: 'booking-selection',
      component: () => import('./components/DateFix.vue')  // or the same file if merged
    },
    {
      path: 'booking-details',
      name: 'BookingDetails',
      component: () => import('./components/PublicDetails.vue') // your dynamic details form
    },
    {
      path: '/review-details',
      component: () => import('./components/ReviewPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/payment',
      component: () => import('./components/RazorPayment.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/ticket',
      component: () => import('./components/TicketPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/loading_ticket',
      component: () => import('./components/LoadingPage.vue'),
      meta: { requiresAuth: true }
    }
  ]
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