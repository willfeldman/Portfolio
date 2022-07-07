import React from "react";
import "./App.css";
import Homepage from "./components/homepage/Homepage";
import ExperienceModal from "./components/experience-section/experience-modal/ExperienceModal";
import Error from "./components/error/Error";
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

function App() {
  let location = useLocation();
  let state = location.state as { backgroundLocation?: Location };
  return (
    <>
        <Routes location={state?.backgroundLocation || location}>
          <Route path="/" element={<Homepage />} />
          <Route path="*" element={<Error />} />
        </Routes>
        {state?.backgroundLocation && (
          <Routes>
            <Route path="/experience/:id" element={<ExperienceModal />} />
          </Routes>
        )}
    </>
  );
}

export default App;