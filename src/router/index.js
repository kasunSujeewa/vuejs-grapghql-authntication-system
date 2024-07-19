import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import HomePage from '../views/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      meta: { guestOnly: true },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage,
      meta: { guestOnly: true },
    },
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: { requiresAuth: true },
    },
    
  ]
})

// Add a navigation guard to check for authentication and guest access
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('auth-token')

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      next({ name: 'login' })
    } else {
      // Optional: Validate the token with a function
      if (!isValidToken(token)) {
        localStorage.removeItem('auth-token')
        next({ name: 'login' })
      } else {
        next()
      }
    }
  } else if (to.matched.some(record => record.meta.guestOnly)) {
    if (token && isValidToken(token)) {
      next({ name: 'home' })
    } else {
      next()
    }
  } else {
    next()
  }
})

// Optional function to validate token (implement as needed)
function isValidToken(token) {
  // Logic to check if the token is valid
  // This could be a simple expiration check or a call to your backend
  return true // Replace with actual validation logic
}

export default router
