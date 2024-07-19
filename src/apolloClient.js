import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'


// HTTP connection to the API
 const httpLink = createHttpLink({
    // You should use an absolute URL here
    uri: 'http://127.0.0.1:8000/graphql',
    headers:{
      "Accept" : "application/json",
      "Access-Control-Allow-Headers": "*"
    }
  })

  // Authentication middleware

      const authLink = setContext((_, { headers }) => {
          // Get the authentication token from local storage if it exists
          const token = localStorage.getItem('auth-token')
          // Return the headers to the context so httpLink can read them
          return {
            headers: {
              ...headers,
              authorization: token ? `Bearer ${token}` : '',
            }
          }
        })
  
  
  // Cache implementation
  const cache = new InMemoryCache()
  
  // Create the apollo client
  export const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
  })