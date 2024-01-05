import React from 'react';
import FloorPlanEditor from './components/PlanEditor/FloorPlanEditor';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import GenericNavbar from './components/Generic/GenericNavbar';
import Sidebar from './components/Generic/Sidebar';

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <GenericNavbar />
        <div className="content-area">
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/floorplan-editor" element={<FloorPlanEditor />} />
              {/* Aquí van tus otras rutas */}
            </Routes>
          </main>
        </div>
      </Router>
    </>
  );
}

export default App;
