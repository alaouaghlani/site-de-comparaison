import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/Voiliers.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const Voiliers = ({ voiliers }) => {
  return (
    <div className="voiliers col-sm-12 col-md-6 col-lg-10">
      {voiliers.map((voilier) => (
        <div key={voilier.slug} className="voilier">
          <Link to={`/voilier/${voilier.slug}`}>
            <img src={voilier.image} alt={voilier.name} />
          </Link>
          <div className="product-info">
            <Link
              to={`/voilier/${voilier.slug}`}
              className="link-no-decoration"
            >
              <p>{voilier.name}</p>
            </Link>
            <p>
              <strong>${voilier.price}</strong>
            </p>
            <Link to={`/voilier/${voilier.slug}`}>
              <Button className="viewMoreButton ">View More</Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Voiliers;
