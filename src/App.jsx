import FloorPlanEditor from './components/PlanEditor/FloorPlanEditor';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import GenericNavbar from './components/Generic/GenericNavbar';
import Comandas from './components/pages/Comandas';
import Articulos from './components/pages/Articulos';

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <GenericNavbar />
        <div className="content-area">
          <main className='bg-slate-100 full-height'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/floorplan-editor" element={<FloorPlanEditor />} />
              <Route path="/comandas" element={<Comandas />} />
              <Route path="/articulos" element={<Articulos />} />
              {/* Aquí van tus otras rutas */}
            </Routes>
          </main>
        </div>
      </Router>
    </>
  );
}

export default App;
