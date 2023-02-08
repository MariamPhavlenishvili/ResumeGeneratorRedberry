import { Link } from "react-router-dom";

import "./Landing.css";
import redberry from "../img/LOGO-02.png";
import logo from "../img/LOGO-40.png";

function Landing() {
  return (
    <>
      <header>
        <div className="header">
          <img src={redberry} alt="Redberry Logo" className="redberryLogo" />
        </div>
      </header>
      <div className="container">
        <img src={logo} alt="Stamp Logo" className="logo" />
        <Link to="/personal-info" className="btn">რეზიუმეს დამატება</Link>
      </div>
    </>
  );
}

export default Landing