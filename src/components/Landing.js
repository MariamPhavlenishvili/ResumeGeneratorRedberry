import { Link } from "react-router-dom";

import "./Landing.css";
import redberry from "../img/LOGO-02.png";
import logo from "../img/LOGO-40.png";

function Landing() {
  return (
    <>
      <div className="container">
        <header>
          <div className="header">
            <img src={redberry} alt="Redberry Logo" className="redberryLogo" />
          </div>
        </header>
        <img src={logo} alt="Stamp Logo" className="logo" />
        <div className="center">
          <Link to="/personal-info" className="btn">
            რეზიუმეს დამატება
          </Link>
        </div>
      </div>
    </>
  );
}

export default Landing;
