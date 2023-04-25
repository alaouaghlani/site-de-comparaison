import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/Voiliers.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

const Voiliers = ({ voiliers }) => {
  return (
    <div className="voiliers">
      {voiliers.map((voilier) => (
        <Card style={{ width: '20%' }} key={voilier._id}>
          <Link to={`/voiliers/${voilier._id}`}>
            <Card.Img
              variant="top"
              src={voilier.images}
              alt={voilier.Nom}
            ></Card.Img>
          </Link>
          <Card.Body>
            <Card.Title>{voilier.Nom}</Card.Title>
            {/* <Card.Text>{voilier.Description}</Card.Text> */}
          </Card.Body>
          <Link to={`/voiliers/${voilier._id}`}>
            <Button className="viewMoreButton"> View more</Button>
          </Link>
        </Card>
      ))}
    </div>
  );
};
export default Voiliers;
