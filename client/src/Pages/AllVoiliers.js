import React, { useState } from 'react';
import useFetch from '../useFetch';
import Voiliers from '../Components/Voiliers';
import Pagination from '../Components/Pagination';
import Sidebar from '../Components/Sidebar';
import '../assets/AllVoiliers.css';
import CircularProgress from '@mui/material/CircularProgress';

const AllVoiliers = () => {
  const [voilierPerPage, setVoilierPerPage] = useState(20);
  const {
    data: voiliers,
    isPending,
    error,
  } = useFetch('http://localhost:5000/voiliers');

  // states
  const [priceRange, setPriceRange] = useState([0, 100000000]);

  const [currentPage, setCurrentPage] = useState(1);
  const [marqueFilter, setMarqueFilter] = useState([]);
  const [longueurFilter, setLongueurFilter] = useState([]);
  const [anneeFilter, setAnneeFilter] = useState([]);
  const lastVoilierIndex = currentPage * voilierPerPage;
  const firstVoilierIndex = lastVoilierIndex - voilierPerPage;

  //
  const handlePriceRangeChange = (event, newPriceRange) => {
    setPriceRange(newPriceRange);
  };

  const handleMarqueFilterChange = (event) => {
    const brand = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setMarqueFilter([...marqueFilter, brand]);
    } else {
      setMarqueFilter(marqueFilter.filter((f) => f !== brand));
    }
  };
  const handleLongueurFilterChange = (event) => {
    const height = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setLongueurFilter([...longueurFilter, height]);
    } else {
      setLongueurFilter(longueurFilter.filter((f) => f !== height));
    }
  };
  const handleAnneeFilterChange = (event) => {
    const year = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setAnneeFilter([...anneeFilter, year]);
    } else {
      setAnneeFilter(anneeFilter.filter((f) => f !== year));
    }
  };
  //
  const filtredVoiliers =
    voiliers?.filter((voilier) => {
      const numericString = voilier.Prix?.match(/\d[\d\s,.]*/)?.[0]
        .replace(/[^\d.]/g, '')
        .replace(',', '.');
      const price = numericString ? Number(numericString) : null;
      if (
        marqueFilter.length === 0 &&
        longueurFilter.length === 0 &&
        anneeFilter.length === 0 &&
        priceRange.length === 2 &&
        // added priceRange check
        price >= priceRange[0] &&
        price <= priceRange[1]
      )
        return true;
      const priceMatch = priceRange.includes(price);
      const anneeMatch = anneeFilter.includes(voilier.Année);
      const marqueMatch = marqueFilter.includes(voilier.Fabricant);
      const longueurMatch = longueurFilter.includes(
        voilier.Longueur?.toString()
      );

      return (
        (marqueMatch && longueurMatch && anneeMatch) || // added priceMatch check
        marqueMatch ||
        longueurMatch ||
        anneeMatch ||
        priceMatch // added priceMatch check
      );
    }) || [];

  const currentVoiliers = filtredVoiliers
    ? filtredVoiliers.slice(firstVoilierIndex, lastVoilierIndex)
    : [];

  return (
    <div>
      {error && <div className="error">{error}</div>}
      {isPending && (
        <div className="loading">
          <div>
            <CircularProgress />
          </div>
          <div>
            <p>Loading...</p>
          </div>
        </div>
      )}
      {voiliers && (
        <>
          <div className="Allsailboats">
            <div className="theSideBar">
              <Sidebar
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                handlePriceRangeChange={handlePriceRangeChange}
                marqueFilter={marqueFilter}
                setMarqueFilter={setMarqueFilter}
                handleMarqueFilterChange={handleMarqueFilterChange}
                longueurFilter={longueurFilter}
                setLongueurFilter={setLongueurFilter}
                handleLongueurFilterChange={handleLongueurFilterChange}
                anneeFilter={anneeFilter}
                setAnneeFilter={setAnneeFilter}
                handleAnneeFilterChange={handleAnneeFilterChange}
              ></Sidebar>
            </div>
            <div className="theSailBoats">
              <Voiliers voiliers={currentVoiliers} />
            </div>
          </div>
          <Pagination
            totalVoiliers={voiliers.length}
            voilierPerPage={voilierPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </>
      )}
    </div>
  );
};

export default AllVoiliers;
