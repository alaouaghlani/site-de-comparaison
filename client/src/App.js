import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyNavbar from './Components/MyNavbar';
import Home from './Components/Home';
import VoilierDetails from './Components/VoilierDetails';
import Container from 'react-bootstrap/esm/Container';
import Footer from './Components/Footer';
import data from './data';
function App() {
  //search bar
  // const [searchResult, setSearchResult] = useState([]);
  // const performSearch = (searchQuery) => {
  //   const SearchResults = data.voiliers.filter((voilier) => {
  //     voilier.name.toLowerCase().includes(searchQuery.toLowerCase());
  //   });
  //   setSearchResult(SearchResults);
  // };
  return (
    <BrowserRouter>
      <div className="App d-flex flex-column">
        <MyNavbar></MyNavbar>
        <main className="main ">
          <Container>
            <Routes>
              <Route path="/" element={<Home></Home>} />
              <Route
                path="/voilier/:slug"
                element={<VoilierDetails></VoilierDetails>}
              />
            </Routes>
          </Container>
        </main>
        <div>
          <Footer></Footer>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
