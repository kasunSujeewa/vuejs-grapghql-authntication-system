import gql from 'graphql-tag'

export const GET_ME = gql`
  query getUser {
    me {
      name
    }
  }
`

export const GET_ALL = gql`
  query getUsers {
    users(first: 10, page: 1) {
      data {
        id
        name
        email
      }
      paginatorInfo {
        hasMorePages
      }
    }
  }
`
