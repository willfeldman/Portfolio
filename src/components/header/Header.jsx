import Button from "../elements/button/link/Button";
import { HiOutlineMail } from "react-icons/hi";
import { IoDocumentOutline, IoLogoGithub } from "react-icons/io5";
import { info } from "../../data/info";
import "./Header.scss";

function Header() {
  return (
    <div className="header">
      <div className="container">
        <div className="information">
          <div className="profile">
          <img
              className="text-bubble"
              draggable="false" 
              src="https://willfeldman.com/src/text-bubble.png"
              alt="Profile bubble"
            />
            <img
              className="profile-image"
              draggable="false" 
              src="https://willfeldman.com/src/will_emoji.png"
              alt="Profile"
            />
            
          </div>
          <div className="text">
            <h1 className="name typed-out">{info.name}</h1>
          </div>
          
        </div>
        <div className="links">
        <div className="github">
            <Button
              link={info.gitHub}
              tooltip="GitHub"
              icon={<IoLogoGithub />}
            />
          </div>
          <div className="resume">
            <Button
              link={info.resume}
              tooltip="Resume"
              icon={<IoDocumentOutline />}
            />
          </div>
          <div className="contact">
            <Button
              link={`mailto:${info.email}`}
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
