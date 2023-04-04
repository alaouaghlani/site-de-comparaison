import React, { useState } from 'react';
import '../assets/Home.css';
import Sidebar from './Sidebar';
import Voiliers from './Voiliers';
import data from '../data';

function Home() {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const products = data.voiliers.filter(
    (product) =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
  );

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar priceRange={priceRange} setPriceRange={setPriceRange}></Sidebar>
      <Voiliers voiliers={products}></Voiliers>
    </div>
  );
}
export default Home;
