import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/pages/home";
import NewProject from "./components/pages/newProject";
import Container from "./components/pages/layout/Container";
import NavBar from "./components/pages/NavBar";
import Projetos from "./components/pages/projetos";
import ProjectEdite from "./components/pages/projectEdite";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Container customClass="home">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/newproject" element={<NewProject />} />
          <Route path="/projetos" element={<Projetos />} />
          <Route path="/project/:id" element={<ProjectEdite />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
