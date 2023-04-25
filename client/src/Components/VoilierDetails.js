import { Button, Container, Row, Col } from 'react-bootstrap';

import { Link, useParams } from 'react-router-dom';

import '../assets/VoilierDetails.css';
import useFetch from '../useFetch';

function VoilierDetails() {
  const { id } = useParams();
  const {
    data: voiliers,
    error,
    isPending,
  } = useFetch('http://localhost:5000/voiliers/' + id);
  return (
    <Container className="Main">
      {isPending && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {voiliers && (
        <article>
          <h1 className="Title">{voiliers.Nom}</h1>
          <div className="Details">
            <Row>
              <Col>
                <div className="Left">
                  <img src={voiliers.images} alt={voiliers.Nom} />
                </div>
              </Col>
              <Col>
                <div className="Right">
                  <div className="Description">{voiliers.Description}</div>
                  <div className="More-details">
                    <div>
                      <div className="Brand-title">{voiliers.Nom}</div>
                      <div className="Price">{voiliers.Prix}</div>
                      <div className="Button">
                        <Link to={voiliers.Url}>
                          <Button variant="dark">More detailts</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </article>
      )}
    </Container>
  );
}

export default VoilierDetails;
