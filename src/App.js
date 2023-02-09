import { Routes, Route, Link } from "react-router-dom";

import Landing from "./components/Landing";
import PersonalInfo from "./components/form/Personal";
import Experience from "./components/form/Experience";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/personal-info" element={<PersonalInfo />} />
      <Route path="/experience" element={<Experience />} />
    </Routes>
  );
}

export default App;
