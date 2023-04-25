import '../assets/Home.css';
import Voiliers from './Voiliers';
import SideBar from './Sidebar';
import useFetch from '../useFetch';
import { useState } from 'react';
import Pagination from './Pagination';

function Home() {
  //
  const [currentpage, setCurrentpage] = useState(1);
  const [voilierPerPage, setVoiierPerPage] = useState(25);
  const {
    data: voiliers,
    isPending,
    error,
  } = useFetch('http://localhost:5000/voiliers');

  const lastVoilierIndex = currentpage * voilierPerPage;
  const firstVoilierIndex = lastVoilierIndex - voilierPerPage;
  const currentVoiliers = voiliers
    ? voiliers.slice(firstVoilierIndex, lastVoilierIndex)
    : [];
  return (
    <div style={{ display: 'flex' }}>
      <SideBar></SideBar>

      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {voiliers && (
        <>
          <Voiliers voiliers={voiliers} />
          {/* <Pagination
            totalVoiliers={voiliers.length}
            voilierPerPage={voilierPerPage}
            setCurrentPage={setCurrentpage}
            currentPage={currentpage}
          /> */}
        </>
      )}
    </div>
  );
}
export default Home;
