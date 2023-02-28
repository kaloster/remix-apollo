import { useQuery } from "@apollo/client";
import { LOCATIONS_QUERY } from "../graphql/queries/getLocations";
import { Container, Col, Row } from './styles'

export default function Index() {
  const { data } = useQuery(LOCATIONS_QUERY);
  return (
    <Container>
      {data && data.countries.map((item: any) => (
        <Row key={item.name}>
          <Col>{item.name}</Col>
          <Col>{item.capital}</Col>
          <Col>{item.currency}</Col>
          <Col>{item.languages.length > 0 && item.languages[0].name}</Col>
          <Col>{item.emoji}</Col>
       </Row>
      ))}
    </Container>
  );
}
