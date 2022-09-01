import "@reach/dialog/styles.css";
import "./ProfileView.scss";

function ProfileView() {
  return (
    <div className="profile-modal profile">
      <div className="profileSection">
        <div className="header-image">
          <img
            src="https://ik.imagekit.io/feldman/profile_background.jpg"
            alt="Profile background"
          />
        </div>
        <div className="profile-image">
          <img src="https://ik.imagekit.io/feldman/profile.jpg" alt="Profile" />
        </div>
      </div>
      <div className="profile-contents">
        <h1>Will Feldman</h1>
        <h1>Student at Northeastern University</h1>
      </div>
    </div>
  );
}

export default ProfileView;
