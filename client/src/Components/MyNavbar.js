import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/Navbar.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import ConnectButton from './ConnectButton';
// import data from '../data';
import * as Icon from 'react-bootstrap-icons';

function MyNavbar(props) {
  //search bar
  // const [searchQuery, setSearchQuery] = useState('');

  // const handleInputChange = (event) => {
  //   setSearchQuery(event.target.value);
  // };
  // const HandleSearch = () => {
  //   props.performSearch(searchQuery);
  // };
  return (
    <div>
      <Navbar bg="primary" expand="lg" className="Nav">
        <Container fluid>
          <Navbar.Brand className="Brand">
            <Link
              to={'/'}
              style={{
                textDecoration: 'none',
                color: '#fff680',
                fontWeight: 'bold',
                fontSize: '1.4em',
                marginLeft: '20px',
              }}
            >
              Luxury Yacht
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              {/* <NavDropdown title="Categories" id="navbarScrollingDropdown">
                {data.voiliers.map((voilier) => (
                  <NavDropdown.Item href="#action3">
                    {voilier.category}
                  </NavDropdown.Item>
                ))}
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown> */}
              <Nav.Link href="#action2">My Favorites</Nav.Link>

              <Form className="d-flex ">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2 rounded-pill"
                  aria-label="Search"
                />
                <Button variant="light " className="me-2 rounded-pill">
                  <Icon.Search></Icon.Search>
                </Button>
              </Form>
            </Nav>

            <ConnectButton></ConnectButton>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default MyNavbar;
