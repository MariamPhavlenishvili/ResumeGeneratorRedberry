import { Routes, Route, Link } from "react-router-dom";

import Landing from "./components/Landing";
import PersonalInfo from "./components/form/Personal";
import Experience from "./components/form/Experience";
import Education from "./components/form/Education";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/personal-info" element={<PersonalInfo />} />
      <Route path="/experience" element={<Experience />} />
      <Route path="/education" element={<Education />} />
    </Routes>
  );
}

export default App;
