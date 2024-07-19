import App from './App.vue'
import router from './router'
import './index.css'
import { createApp, provide, h } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { apolloClient } from './apolloClient'
import { createPinia } from 'pinia'

const pinia = createPinia()

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App)
})
app.use(router)
app.use(pinia)
app.mount('#app')
