import React from "react";
import Homepage from "./components/homepage/Homepage";
import ExperienceView from "./components/experience-section/experience-view/ExperienceView";
import ProjectView from "./components/project-section/project-view/ProjectView";
import ImageView from "./components/image-view/ImageView";
import Error from "./components/error/Error";
import Modal from "./components/elements/modal/Modal";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import OrganizationView from "./components/organization-section/organization-view/OrganizationView";

function App() {
  let location = useLocation();
  let state = location.state as { backgroundLocation?: Location };
  return (
    <div className="app">
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<Homepage />} />
        <Route path="/experience/:id" element={<ExperienceView />} />
        <Route path="/project/:id" element={<ProjectView />} />
        <Route path="/organization/:id" element={<OrganizationView />} />
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
        </Routes>
      )}
    </div>
  );
}

export default App;
