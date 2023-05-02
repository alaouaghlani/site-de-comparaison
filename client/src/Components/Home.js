import '../assets/Home.css';
import Voiliers from './Voiliers';
import SideBar from './Sidebar';
import useFetch from '../useFetch';
import { useState } from 'react';
import Pagination from './Pagination';

function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [voilierPerPage, setVoilierPerPage] = useState(25);
  const {
    data: voiliers,
    isPending,
    error,
  } = useFetch('http://localhost:5000/voiliers');

  const lastVoilierIndex = currentPage * voilierPerPage;
  const firstVoilierIndex = lastVoilierIndex - voilierPerPage;
  const currentVoiliers = voiliers
    ? voiliers.slice(firstVoilierIndex, lastVoilierIndex)
    : [];

  return (
    <div className="home-container">
      <SideBar />
      <div className="main-container">
        <h1 className="title">Liste des voiliers</h1>
        {error && <div className="error">{error}</div>}
        {isPending && <div className="loading">Loading...</div>}
        {voiliers && (
          <>
            <Voiliers voiliers={currentVoiliers} />
            <Pagination
              totalVoiliers={voiliers.length}
              voilierPerPage={voilierPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
