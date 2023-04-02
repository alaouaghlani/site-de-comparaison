import { useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';

import { useParams } from 'react-router-dom';

import '../assets/VoilierDetails.css';
import data from '../data';

function VoilierDetails() {
  const { slug } = useParams();
  useEffect(() => {
    fetch(`/voilier/slug/${slug}`);
  }, [slug]);
  const voilier = data.voiliers.find((x) => x.slug === slug);
  return (
    <Container className="Main">
      <h1 className="Title">{slug}</h1>
      <div className="Details">
        <Row>
          <Col>
            <div className="Left">
              <img src={voilier.image} alt={voilier.slug} />
            </div>
          </Col>
          <Col>
            <div className="Right">
              <div className="Description">{voilier.description}</div>
              <div className="More-details">
                <div>
                  <div className="Brand-title">{voilier.brand}</div>
                  <div className="Price">${voilier.price}</div>
                  <div className="Button">
                    <Button variant="dark">More detailts</Button>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default VoilierDetails;
