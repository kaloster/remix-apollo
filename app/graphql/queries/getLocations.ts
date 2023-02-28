import { gql } from "@apollo/client";

export const LOCATIONS_QUERY = gql`
    query Query {
      countries{
        name
        native
        capital
        emoji
        currency
        languages {
          code
          name
        }
      }
    }
`;