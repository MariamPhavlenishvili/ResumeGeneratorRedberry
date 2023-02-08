import { Routes, Route, Link } from "react-router-dom";

import Landing from "./components/Landing";
import PersonalInfo from "./components/form/Personal";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/personal-info" element={<PersonalInfo/>}/>
    </Routes>
  );
}

export default App;

