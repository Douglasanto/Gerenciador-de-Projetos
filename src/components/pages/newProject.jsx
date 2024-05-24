import React from "react";
import { useNavigate } from "react-router-dom";

import "../../index.css";
import ProjectForm from "../project/projectForm";

function NewProject() {
  const navigate = useNavigate();

  function createPost(project) {
    if (!project.name || !project.budget) {
      alert("Por favor, preencha todos os campos do projeto.");
      return;
    }

    project.cost = 0;
    project.services = [];

    fetch("http://localhost:5000/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        navigate("/projetos", {
          state: { message: "Projeto criado com sucesso" },
        });
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="newproject_container">
      <h1>Criar projeto</h1>
      <p>Crie seu projeto para depois adicionar os serviços</p>
      <ProjectForm handleSubmit={createPost} btnText="Criar Projeto" />
    </div>
  );
}

export default NewProject;
