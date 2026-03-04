import { createWebHistory, createRouter } from "vue-router";
import store from './store';
const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/beta/',
        component: () => import('./components/HomePage.vue'),
        children: [
          {
            path: '/beta/login/entermobile',
            alias: '/beta/',
            component: () => import('./components/MobileEnter.vue')
          },
          {
            path: '/beta/otp',
            component: () => import('./components/OtpPage.vue')
          },
        ]
      },
      {
        path: '/beta/booking-page',
        component: () => import('./components/BookingPage.vue'),
        meta: { requiresAuth: true },
        children: [
          {
            path: '',
            alias: '/beta/date',
            name: 'booking-selection',
            component: () => import('./components/DateFix.vue')
          },
          {
            path: 'booking-details',
            name: 'BookingDetails',
            component: () => import('./components/PublicDetails.vue')
          },
          {
            path: '/beta/review-details',
            component: () => import('./components/ReviewPage.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: '/beta/payment',
            component: () => import('./components/RazorPayment.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: '/beta/ticket',
            component: () => import('./components/TicketPage.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: '/beta/loading_ticket',
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
        path: '/beta/access-not-allowed',
        name: 'forbid',
        component: () => import('./components/ForbiddenPage.vue')
      },
    ],
    scrollBehavior(_, _2, savedPosition) {
      if (savedPosition) {
          return savedPosition;
      }
      return { left: 0, top: 0 };
    },
});

router.beforeEach((to, _2, next) => {
  const token = store.getters.getsession;

  if (to.meta.requiresAuth) {
    if (!token) {
      next({ name: 'forbid' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;