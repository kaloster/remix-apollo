import { gql, useQuery } from "@apollo/client";

const LOCATIONS_QUERY = gql`
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

export default function Index() {
  const { data } = useQuery(LOCATIONS_QUERY);  
  return (
    <div>
      {JSON.stringify(data)}
    </div>
  );
}