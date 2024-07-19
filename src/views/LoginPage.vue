<template>
  <div class="grid md:grid-cols-4 grid-cols-8 text-center py-20">
    <div class="col-span-1"></div>
    <div
      class="md:col-span-2 col-span-6 min-h-96 bg-white-500 border border-lime-700 rounded-md my-20"
    >
      <div class="grid grid-cols-1 gap-5">
        <div>
          <p class="pt-3 text-lg font-extrabold text-lime-700">Login</p>
        </div>
        <div class="mt-10">
          <input
            type="text"
            v-model="email"
            placeholder="Email"
            class="border border-lime-700 text-center rounded-md w-60 p-2 focus:border-none focus:outline-none"
          />
        </div>
        <div>
          <input
            type="password"
            v-model="password"
            placeholder="Password"
            class="border border-lime-700 text-center rounded-md w-60 p-2 focus:border-none focus:outline-none"
          />
        </div>
        <div>
          <button
            class="bg-lime-700 px-5 py-1 text-white hover:text-black rounded-md"
            @click="login"
          >
            Login
          </button>
        </div>
        <div>
          <RouterLink to="/register" class="text-blue-700">If you don't have account</RouterLink>
        </div>
      </div>
    </div>
    <div class="col-span-1"></div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { USER_LOGIN } from '@/graphql/mutations'
import { useMutation } from '@vue/apollo-composable'
import { useAuthUser } from '@/store/authStore'

const email = ref('')
const password = ref('')
const router = useRouter()

const login = async () => {
  try {
    const res = await LoginUser({
      email: email.value,
      password: password.value
    })
    email.value = ''
    password.value = ''
  } catch (err) {
    console.error(err)
    
  }
}

const { mutate: LoginUser } = useMutation(USER_LOGIN, {
  variables: { email, password },
  update: (cache, { data: { Login } }) => {
    // Save the token in local storage
    localStorage.setItem('auth-token', Login)
    // Redirect to home page
    router.push({ name: 'home' })
  }
})
</script>

<style></style>
