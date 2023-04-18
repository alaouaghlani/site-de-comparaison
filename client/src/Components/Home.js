import React, { useState } from 'react';
import '../assets/Home.css';
import Sidebar from './Sidebar';
import Voiliers from './Voiliers';
import data from '../data';

function Home() {
  //

  const prices = data.voiliers.map((voilier) => voilier.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
  const products = data.voiliers.filter(
    (product) =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
  );
  const [marqueFilter, setMarqueFilter] = useState([]);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        marqueFilter={marqueFilter}
        setMarqueFilter={setMarqueFilter}
      ></Sidebar>

      <Voiliers voiliers={products}></Voiliers>
    </div>
  );
}
export default Home;
