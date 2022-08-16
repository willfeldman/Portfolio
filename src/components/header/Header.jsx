import Button from "../elements/button/link/Button";
import { HiOutlineMail } from "react-icons/hi";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <div className="container">
        <div className="information">
          <div className="profile">
            <img
              src="https://ik.imagekit.io/feldman/profile.jpg/tr:q-80,h-300,w-300"
              alt="Profile"
            />
          </div>
          <div className="text">
            <h1 className="name">Will Feldman</h1>
            <h1 className="position">Student at Northeastern</h1>
          </div>
        </div>
        <div className="contact">
          <Button
            link="mailto:will@willfeldman.com"
            text="Email"
            icon={<HiOutlineMail />}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
