import { gql } from "graphql-tag";
export const TEST_QUERY = gql`
query MyQuery {
  query {
    allUsers {
      nodes {
        username
        userId
        password
        nodeId
        adminlvl
      }
    }
  }
}
`

export const QUERY_USERS = gql`
  query allUsers {
    users {
      username
      userId
      password
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query singleUser($userId: ID!) {
    user(userId: $userId) {
      _id
      username
      email
    }
  }
`;

