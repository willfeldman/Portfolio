import React from "react";
import "./App.css";
import Header from "./components/header/Header";
import Experience from "./components/experience-section/Experience";
import ExperienceModal from "./components/experience-section/experience-modal/ExperienceModal";

function App() {
  return (
    <>
      <ExperienceModal />
      <Header />
      <Experience />
    </>
  );
}

export default App;
