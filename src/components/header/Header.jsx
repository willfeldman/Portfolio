import Button from "../elements/button/link/Button";
import { HiOutlineMail } from "react-icons/hi";
import { IoDocumentOutline, IoLogoGithub } from "react-icons/io5";
import "./Header.scss";

function Header() {
  return (
    <div className="header">
      <div className="container">
        <div className="information">
          {/*
          <div className="profile">
          <img
              className="text-bubble"
              draggable="false" 
              src="https://chromecommands.com/src/text-bubble.png"
              alt="Profile bubble"
            />
            <img
              className="profile-image"
              draggable="false" 
              src="https://chromecommands.com/src/will_emoji.png"
              alt="Profile"
            />
            
          </div>
          */}
          <div className="text">
            <h1 className="name typed-out">Will Feldman</h1>
          </div>
          
        </div>
        <div className="links">
        <div className="github">
            <Button
              link="https://github.com/willfeldman"
              tooltip="GitHub"
              icon={<IoLogoGithub />}
            />
          </div>
          <div className="resume">
            <Button
              link="https://drive.google.com/file/d/1WXwhLj-WMyd3fSoN8z3BPParTCEd4t2A/view"
              tooltip="Resume"
              icon={<IoDocumentOutline />}
            />
          </div>
          <div className="contact">
            <Button
              link="mailto:will@willfeldman.com"
              tooltip="Email"
              icon={<HiOutlineMail />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
