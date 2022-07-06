import React from "react";
import "./App.css";
import Homepage from "./components/homepage/Homepage";
import ExperienceModal from "./components/experience-section/experience-modal/ExperienceModal";
import Error from "./components/error/Error";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Location causing page to render blank

function App() {
  let location = useLocation();
  let state = location.state as { backgroundLocation?: Location };
  return (
    <>
      <Router>
        <Routes location={state?.backgroundLocation || location}>
          <Route path="/" element={<Homepage />} />
          <Route path="*" element={<Error />} />
        </Routes>
        {state?.backgroundLocation && (
          <Routes>
            <Route path="/experience/:id" element={<ExperienceModal />} />
          </Routes>
        )}
      </Router>
    </>
  );
}

export default App;