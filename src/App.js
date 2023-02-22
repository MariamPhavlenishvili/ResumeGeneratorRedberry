import { Routes, Route, Link } from "react-router-dom";

import Landing from "./components/Landing";
import PersonalInfo from "./components/form/Personal";
import Experience from "./components/form/Experience";
import Education from "./components/form/Education";
import Result from "./components/form/Result";

function App() {
  return (
    <Routes>
      <Route path="/ResumeGeneratorRedberry/" element={<Landing />} />
      <Route path="/ResumeGeneratorRedberry/personal-info" element={<PersonalInfo />} />
      <Route path="/ResumeGeneratorRedberry/experience" element={<Experience />} />
      <Route path="/ResumeGeneratorRedberry/education" element={<Education />} />
      <Route path="/ResumeGeneratorRedberry/result" element={<Result />} />
    </Routes>
  );
}

export default App;
