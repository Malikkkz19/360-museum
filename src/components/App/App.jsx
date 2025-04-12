import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../LandingPage/LandingPage';
import VirtualTour from '../VirtualTour/VirtualTour';
import MapPage from '../MapPage/MapPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/tour/:hallId" element={<VirtualTour />} />
          <Route path="/map" element={<MapPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;