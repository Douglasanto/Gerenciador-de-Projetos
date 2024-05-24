import { useState, useEffect } from "react";

import Input from "./input";
import Select from "./select";
import SubmitButton from "./submitButton";

function ProjectForm({ handleSubmit, btnText, projectData }) {
  const [categories, SetCategories] = useState([]);
  const [project, SetProject] = useState(projectData || []);

  useEffect(() => {
    fetch("http://localhost:5000/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        SetCategories(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const submit = (e) => {
    e.preventDefault();
    handleSubmit(project);
  };
  function handleChange(e) {
    SetProject({ ...project, [e.target.name]: e.target.value });
  }
  function handleSelect(e) {
    SetProject({
      ...project,
      category: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    });
  }
  return (
    <form onSubmit={submit}>
      <Input
        type="text"
        text="Nome do Projeto"
        name="name"
        placeholder="Insira o nome do Projeto"
        handleOnChange={handleChange}
        value={project.name ? project.name : ""}
      />
      <Input
        type="number"
        text="Orçamento do Projeto"
        name="budget"
        placeholder="Insira o orçamento do Projeto"
        handleOnChange={handleChange}
        value={project.budget ? project.budget : ""}
      />
      <Select
        name="category_id"
        text="Selecione uma categoria"
        options={categories}
        handleOnChange={handleSelect}
        value={project.category ? project.category.id : ""}
      />

      <SubmitButton text={btnText} />
    </form>
  );
}

export default ProjectForm;
