import React, { useEffect, useState } from 'react';
import '../assets/Sidebar.css';
import { Container, Form } from 'react-bootstrap';
import { Slider } from '@mui/material';
import data from '../data';

const Sidebar = (props) => {
  //Price Slider
  const prices = data.voiliers.map((voilier) => voilier.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const [priceRange, setPriceRange] = useState([]);

  // useEffect(() => {
  //   fetch('/voilier');
  // }, []);

  const handlePriceRangeChange = (event, newPriceRange) => {
    setPriceRange(newPriceRange);
  };

  const products = data.voiliers.filter(
    (product) =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
  );

  //Marque
  const [marqueFilter, setMarqueFilter] = useState([]);
  const handleMarqueFilterChange = (event) => {
    const marque = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setMarqueFilter([...marqueFilter, marque]);
    } else {
      setMarqueFilter(marqueFilter.filter((f) => f !== marque));
    }
  };
  return (
    <Container className="Sidebar ">
      <h2 className="Title">Filtrer</h2>
      <p>Prix</p>
      <Slider
        value={props.priceRange}
        onChange={(event, newPriceRange) => props.setPriceRange(newPriceRange)}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        min={minPrice}
        max={maxPrice}
        style={{ maxWidth: '75% ', margin: '15px' }}
      ></Slider>
      <hr />

      <p>Marque</p>
      <Form>
        {data.voiliers.map((voilier) => (
          <Form.Check
            key={voilier.brand}
            type="checkbox"
            label={voilier.brand}
            value={voilier.brand}
            onChange={handleMarqueFilterChange}
          ></Form.Check>
        ))}
      </Form>
      <p>Longueur</p>
      <Form>
        {data.voiliers.map((voilier) => (
          <Form.Check
            key={voilier.slug}
            type="checkbox"
            label={voilier.height}
            value={voilier.height}
            onChange={handleMarqueFilterChange}
          ></Form.Check>
        ))}
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
