import React from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom"; // Import HashRouter
import Homepage from "./components/homepage/Homepage";
import ExperienceView from "./components/experience-section/experience-view/ExperienceView";
import ProjectView from "./components/project-section/project-view/ProjectView";
import ImageView from "./components/image-view/ImageView";
import Error from "./components/error/Error";
import Modal from "./components/elements/modal/Modal";
import "./App.css";
import OrganizationView from "./components/organization-section/organization-view/OrganizationView";
import AwardView from "./components/award-section/award-view/AwardView";
import { mode } from "./data/darkmode";
import Navigation from "./components/navigation/Navigation";

function App() {  
  let location = useLocation();
  let state = location.state as { backgroundLocation?: Location };
  
  return (
    <div className={`app ${mode}-mode`}>
      <HashRouter> {/* Use HashRouter here */}
        <Routes location={state?.backgroundLocation || location}>
          <Route path="/" element={<Homepage />} />
          <Route path="/index.html" element={<Homepage />} />
          <Route path="/experience/:id" element={<Navigation><ExperienceView /></Navigation>} />
          <Route path="/project/:id" element={<Navigation><ProjectView /></Navigation>} />
          <Route path="/organization/:id" element={<Navigation><OrganizationView /></Navigation>} />
          <Route path="/award/:id" element={<Navigation><AwardView /></Navigation>} />
          <Route path="/image" element={<ImageView />} />
          <Route path="*" element={<Error />} />
        </Routes>
        {state?.backgroundLocation && (
          <Routes>
            <Route
              path="/experience/:id"
              element={
                <Modal>
                  <ExperienceView />
                </Modal>
              }
            />
            <Route
              path="/project/:id"
              element={
                <Modal>
                  <ProjectView />
                </Modal>
              }
            />
            <Route
              path="/organization/:id"
              element={
                <Modal>
                  <OrganizationView />
                </Modal>
              }
            />
            <Route
              path="/award/:id"
              element={
                <Modal>
                  <AwardView />
                </Modal>
              }
            />
          </Routes>
        )}
      </HashRouter> {/* Close HashRouter here */}
    </div>
  );
}

export default App;
