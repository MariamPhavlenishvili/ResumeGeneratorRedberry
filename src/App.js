import { useState } from "react";
// import "./App.css";
import redberry from "./img/LOGO-02.png";
import logo from "./img/LOGO-40.png";

import PersonalInfo from "./form/Personal";

function App() {
  const [loadInfoPage, setLoadInfoPage] = useState(false);
  return (
    <>
      {/* <header>
        <div className="header">
          <img src={redberry} alt="Redberry Logo" className="redberryLogo" />
        </div>
      </header>
      <div className="container">
        <img src={logo} alt="Stamp Logo" className="logo" />
        <button onClick={() => setLoadInfoPage(!loadInfoPage)} className="btn">
          რეზიუმეს დამატება
        </button>
      </div> */}
      <PersonalInfo />
    </>
  );
}

export default App;
