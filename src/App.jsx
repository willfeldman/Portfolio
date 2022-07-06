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
          <Route
            path="/experience/:id"
            element={
              <ExperienceModal
                headerimage="https://ik.imagekit.io/feldman/blueport_header.png"
                logo="https://ik.imagekit.io/feldman/blueport_logo.jpeg"
                position="Product Manager"
                company="Blueport"
                location="Boston, MA"
                dates="Jan 2022 - Present"
                url="https://www.blueport.com"
                linkedin="https://www.linkedin.com/company/blueport-commerce/"
                summary={[
                  "Led a web performance focused 4-person scrum team in daily standups and sprint planning",
                  "Regularly met and communicated with several internal and external stakeholders of projects to collaborate and gather feedback",
                ]}
                description="Text here"
              />
            }
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
