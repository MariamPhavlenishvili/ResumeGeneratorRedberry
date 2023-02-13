import { useState } from "react";

import Resume from "../Resume";

import "./style.css";

import arrow from "../../icons/Vector.svg";
import close from "../../icons/close.svg";

const Result = () => {
  const storedData = JSON.parse(localStorage.getItem("data"));

  const removeData = () => {
    // localStorage.removeItem("data");
    console.log("test");
  };

  return (
    <div className="result-container">
      <a href="/" className="icon last-page-arrow" onClick={removeData}>
        <img src={arrow} alt="Your SVG" className="svg" />
      </a>
      <div className="submited-resume">
        <Resume props={storedData} />
      </div>
      <Popup />
    </div>
  );
};

const Popup = () => {
  const [hide, setHide] = useState(false);
  return (
    <>
      {!hide && (
        <div className="popup">
          <span className="close-icon" onClick={(e) => setHide(true)}>
            <img src={close} alt="close-icon" />
          </span>
          <span>რეზიუმე წარმატებით გაიგზავნა 🎉</span>
        </div>
      )}
    </>
  );
};

export default Result;
