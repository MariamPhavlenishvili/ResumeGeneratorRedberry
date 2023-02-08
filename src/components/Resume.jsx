import profile from "../img/profile.png";
import logo from "../img/ResumeLogo.png";

import email from "../icons/email.svg";
import phone from "../icons/mobile.svg";

const Resume = ({ props }) => {
  const info = { ...props };

  return (
    <>
      <div className="resume">
        {info.file && (
          <div className="profile">
            <img src={info.file} alt="profile pic" />
          </div>
        )}
        <div className="first-last-name">
          {info.firstname && <h1>{info.firstname}</h1>}
          {info.lastname && <h1>{info.lastname}</h1>}
        </div>
        <div className="contact">
          {info.email && (
            <div className="email">
              <img src={email} alt="email icon" c />
              <p>{info.email}</p>
            </div>
          )}
          {info.phone && (
            <div className="mobile">
              <img src={phone} alt="phone icon" />
              <p>{info.phone}</p>
            </div>
          )}
        </div>
        {info.about && (
          <div>
            <h3>ჩემ შესახებ</h3>
            <p>{info.about}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Resume;
