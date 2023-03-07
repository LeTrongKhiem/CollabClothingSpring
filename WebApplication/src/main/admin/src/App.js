import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./assets/css/grid.css";
import "./assets/css/index.css";
import Sidebar from "./components/sidebar/Sidebar";
import { Dashboard, Customers } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <div className="layout">
        <Sidebar />
        <div className="layout__content">
          <div className="layout__content-main">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="customers" element={<Customers />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
