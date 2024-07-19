import gql from 'graphql-tag'

export const USER_LOGIN = gql`
  mutation LoginUser($email: String!, $password: String!) {
    Login(email: $email, password: $password, device_name: "web")
  }
`
