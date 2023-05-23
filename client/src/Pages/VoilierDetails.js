import { Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import useFetch from '../useFetch';
import '../assets/VoilierDetails.css';

function VoilierDetails() {
  const { id } = useParams();
  const {
    data: voilier,
    error,
    isPending,
  } = useFetch(`http://localhost:5000/voiliers/${id}`);

  return (
    <div className="voilier-details">
      {isPending && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {voilier && (
        <article className="voilier-details__article">
          <h1 className="voilier-details__title">{voilier.Nom}</h1>
          <div className="voilier-details__content">
            <div className="voilier-details__image-container">
              <img
                src={require(`../images/${voilier.Image}`)}
                alt={voilier.Nom}
              />
            </div>
            <div className="voilier-details__description-container">
              <p className="voilier-details__description">
                {voilier.Description}
              </p>
              <div className="voilier-details__details-container">
                <div className="voilier-details__price-container">
                  <p className="voilier-details__price-title">Price:</p>
                  <p className="voilier-details__price">{voilier.Prix} </p>
                </div>
                <div className="voilier-details__price-container">
                  <p className="voilier-details__price-title">Length:</p>
                  <p className="voilier-details__price">{voilier.Longueur} </p>
                </div>
                <div className="voilier-details__price-container">
                  <p className="voilier-details__price-title">Brand:</p>
                  <p className="voilier-details__price">{voilier.Fabricant}</p>
                </div>
              </div>
              <div className="voilier-details__button-container">
                <Link to={voilier.Url}>
                  <Button variant="dark" className="voilier-details__button">
                    More Details
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </article>
      )}
    </div>
  );
}

export default VoilierDetails;
