<template>
  <div class="grid grid-cols-1">Users</div>
  <div class="grid grid-cols-4 gap-10 m-4">
    <div
      v-for="user in users"
      :key="user.id"
      class="border p-4 text-center grid grid-cols-1 border-lime-700 hover:border-dashed"
    >
      <p>{{ user.name }}</p>
      <p>{{ user.email }}</p>
    </div>
  </div>
</template>

<script setup>
import { GET_ALL, GET_ME } from '@/graphql/userQuery'
import { useAuthUser } from '@/store/authStore'
import { useQuery } from '@vue/apollo-composable'
import { onMounted, ref } from 'vue'

const store = useAuthUser()

const users = ref([])

const getUserData = () => {
  try {
    const { result: queryResult } = useQuery(GET_ME)
    queryResult
    store.name = queryResult.value.me.name
    store.setAuthUser()
    
  } catch (err) {
    console.error(err)
  }

}
const getUserAllData = () => {
  try {
    const { result: queryResult } = useQuery(GET_ALL)
    queryResult
    console.log(queryResult.value.users.data)
    users.value = queryResult.value.users.data
    store.users = queryResult.value.users.data
  } catch (err) {
    console.error(err)
  }
}

getUserData()
getUserAllData()
</script>

<style></style>
