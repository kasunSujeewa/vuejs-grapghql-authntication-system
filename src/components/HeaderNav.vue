<template>
  <div class="grid grid-cols-6 min-h-14 content-center px-5 bg-lime-700 text-white">
    <div class="name xl:col-span-5 sm:col-span-4 col-span-3">
      {{ authUserStore.isAuthUser ? authUserStore.name : 'GrapghQL and Vue' }}
    </div>
    <div class="grid col-span-3 sm:col-span-2 xl:col-span-1 grid-cols-2 gap-1">
      <div v-if="!authUserStore.isAuthUser">
        <RouterLink to="/login">Login</RouterLink>
      </div>
      <div v-else>
        <button @click="Logout">Logout</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthUser } from '@/store/authStore'
import { RouterLink, useRouter } from 'vue-router'
const router = useRouter()


const authUserStore = useAuthUser()

console.log(authUserStore.isAuthUser)
console.log(authUserStore.name)



const Logout = () => {
  // Remove the token from local storage
  localStorage.removeItem('auth-token')
  // Redirect to the login page
  router.push({ name: 'login' })
  authUserStore.setNotAuthUser()
}
</script>

<style></style>
