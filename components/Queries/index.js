import { gql } from 'apollo-boost';

export const GET_USERS = gql`
  {
    getUsers {
      id,
      name,
      username,
      email
    }
  }
`;