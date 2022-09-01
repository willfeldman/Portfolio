import Button from "../elements/button/link/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import "./Profile.css";

function Profile() {
  let location = useLocation();
  let navigate = useNavigate();

  const openProfileModal = () => {
    navigate(`/contact`, {
      state: { backgroundLocation: location },
    });
  };

  return (
    <div className="header">
      <div className="container">
        <div className="information">
          <div className="profile">
            <img
              src="https://ik.imagekit.io/feldman/will_emoji.png/tr:q-80"
              alt="Profile"
            />
          </div>
          <div className="text">
            <h1 className="name">Will Feldman</h1>
            <h1 className="position">Student at Northeastern University</h1>
          </div>
        </div>
        <div className="links">
          <div className="contact">
            <Button
              text="Contact"
              action={openProfileModal}
              icon={<HiOutlineMail />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
