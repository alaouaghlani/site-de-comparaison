import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyNavbar from './Components/MyNavbar';


function App() {
  return (
    <div className='App'>
      <MyNavbar></MyNavbar>
      <BrowserRouter>
      <Routes>
        <Route> </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
