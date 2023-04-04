import React, { useEffect, useState } from 'react';
import '../assets/Sidebar.css';
import { Container, Form } from 'react-bootstrap';
import { Slider } from '@mui/material';
import data from '../data';

const Sidebar = (props) => {
  const prices = data.voiliers.map((voilier) => voilier.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const [priceRange, setPriceRange] = useState(props.priceRange);

  useEffect(() => {
    fetch('/voilier');
  }, []);

  const handlePriceRangeChange = (event, newPriceRange) => {
    props.setPriceRange(newPriceRange);
  };

  const filteredProducts = data.voiliers.filter((product) => {
    return product.price >= priceRange[0] && product.price <= priceRange[1];
  });

  return (
    <Container className="Sidebar">
      <h2 className="Title">Filtrer</h2>
      <p>Prix</p>
      <Slider
        value={props.priceRange}
        onChange={(event, newPriceRange) => props.setPriceRange(newPriceRange)}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        min={minPrice}
        max={maxPrice}
        style={{ maxWidth: '75%', margin: '15px' }}
      ></Slider>
      <hr />
      <p>Fabricant</p>
      <Form>
        <Form.Check type="checkbox" id="" label=""></Form.Check>
        <Form.Check type="checkbox" id="" label=""></Form.Check>
        <Form.Check type="checkbox" id="" label=""></Form.Check>
        <Form.Check type="checkbox" id="" label=""></Form.Check>
      </Form>
      <p>Marque</p>
      <Form>
        <Form.Check type="checkbox" id="" label=""></Form.Check>
        <Form.Check type="checkbox" id="" label=""></Form.Check>
        <Form.Check type="checkbox" id="" label=""></Form.Check>
        <Form.Check type="checkbox" id="" label=""></Form.Check>
      </Form>
      <p>Longueur</p>
      <Form>
        <Form.Check type="checkbox" id="" label=""></Form.Check>
        <Form.Check type="checkbox" id="" label=""></Form.Check>
        <Form.Check type="checkbox" id="" label=""></Form.Check>
        <Form.Check type="checkbox" id="" label=""></Form.Check>
      </Form>
      <p>Annee</p>
      <Form>
        <Form.Check type="checkbox" id="" label=""></Form.Check>
        <Form.Check type="checkbox" id="" label=""></Form.Check>
        <Form.Check type="checkbox" id="" label=""></Form.Check>
        <Form.Check type="checkbox" id="" label=""></Form.Check>
      </Form>
    </Container>
  );
};

export default Sidebar;
