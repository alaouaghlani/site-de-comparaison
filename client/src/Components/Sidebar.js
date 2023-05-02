import React, { useState } from 'react';
import '../assets/Sidebar.css';
import { Container, Form } from 'react-bootstrap';
import { Slider } from '@mui/material';
import useFetch from '../useFetch';

const Sidebar = () => {
  const {
    data: voiliers,
    isPending,
    error,
  } = useFetch('http://localhost:5000/voiliers'); //Price Slider
  const prices = voiliers?.map((voilier) => voilier.Prix) || [];
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const [priceRange, setPriceRange] = useState([]);

  const handlePriceRangeChange = (event, newPriceRange) => {
    setPriceRange(newPriceRange);
  };

  const products =
    voiliers?.filter(
      (product) =>
        product.Prix >= priceRange[0] && product.Prix <= priceRange[1]
    ) || [];

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
  // Longueur
  const [longueurFilter, setLongueurFilter] = useState([]);
  const handleLongueurFilterChange = (event) => {
    const longueur = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setLongueurFilter([...longueurFilter, longueur]);
    } else {
      setLongueurFilter(longueurFilter.filter((f) => f !== longueur));
    }
  };

  return (
    <Container className="Sidebar ">
      <h2 className="Title">Filtrer</h2>
      <p>Prix</p>
      <Slider
        value={priceRange}
        onChange={(event, newPriceRange) => setPriceRange(newPriceRange)}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        min={minPrice}
        max={maxPrice}
        style={{ maxWidth: '75% ', margin: '15px' }}
      ></Slider>
      <hr />

      <p>Marque</p>
      <Form>
        {voiliers?.map((voilier) => (
          <Form.Check
            key={voilier._id}
            type="checkbox"
            label={voilier.Fabricant}
            value={voilier.Fbaricant}
            onChange={handleMarqueFilterChange}
          ></Form.Check>
        )) || []}
      </Form>
      <p>Longueur</p>
      <Form>
        {voiliers?.map((voilier) => (
          <Form.Check
            key={voilier._id}
            type="checkbox"
            label={voilier.Longueur}
            value={voilier.Longueur}
            onChange={handleMarqueFilterChange}
          ></Form.Check>
        )) || []}
      </Form>
      <p>Annee</p>
      <Form>
        {voiliers?.map((voilier) => (
          <Form.Check
            key={voilier._id}
            type="checkbox"
            label={voilier.Année}
            value={voilier.Année}
            onChange={handleMarqueFilterChange}
          ></Form.Check>
        )) || []}
      </Form>
    </Container>
  );
};

export default Sidebar;
