import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../index.css";
import Mensagem from "./layout/message";
import LinkButton from "./layout/LinkButton";
import Container from "./layout/Container";
import ProjectCard from "../project/ProjectCard";
import Loading from "./layout/loading";

function Projetos() {
  const [projects, setProjects] = useState([]);
  const [RemoveLoading, setRemoveLoading] = useState(false);

  const location = useLocation();
  let message = "";
  if (location.state) {
    message = location.state.message;
  }

  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:5000/projects", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
          setProjects(data);
          setRemoveLoading(true);
        })
        .catch((err) => console.log(err));
    }, 400);
  }, []);

  function RemoveProjects(id) {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProjects(projects.filter((project) => project.id !== id));
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div className="projetos_container">
        <div className="title_projetos">
          <h1>Meus Projetos</h1>
          <LinkButton to="/newProject" text="Criar Projeto" />
        </div>
        {message && <Mensagem type="success" msg={message} />}
        <Container customClass="grid-layout">
          {projects.length > 0 &&
            projects.map((project) => (
              <ProjectCard
                id={project.id}
                name={project.name}
                budget={project.budget}
                category={project.category.name}
                key={project.id}
                handleRemove={RemoveProjects}
              />
            ))}
          {!RemoveLoading && <Loading />}
          {RemoveLoading && projects.length === 0 && (
            <p>Não tem projetos ainda</p>
          )}
        </Container>
      </div>
    </>
  );
}

export default Projetos;
