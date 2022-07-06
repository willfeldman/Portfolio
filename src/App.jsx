import React from "react";
import "./App.css";
import Homepage from "./components/homepage/Homepage";
import ExperienceModal from "./components/experience-section/experience-modal/ExperienceModal";
import Error from "./components/error/Error";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/experience/:id" element={<ExperienceModal />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
