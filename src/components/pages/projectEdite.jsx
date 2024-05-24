import { Link, useParams } from "react-router-dom";
import { parse, v4 as uuidv4 } from "uuid";
import "../../index.css";
import { useState, useEffect } from "react";
import Loading from "./layout/loading";
import Container from "./layout/Container";
import Message from "./layout/message";
import ProjectForm from "../project/projectForm";
import ServiceForm from "../service/ServiceForm";
import ServiceCard from "../service/ServiceCard";

function ProjectEdite() {
  const { id } = useParams();

  const [Project, setProject] = useState([]);
  const [ShowProjectForm, setShowProjectForm] = useState(false);
  const [ShowServiceForm, setShowServiceForm] = useState(false);
  const [message, setMessage] = useState();
  const [type, setType] = useState();
  const [services, setServices] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setProject(data);
          setServices(data.services);
        })
        .catch((err) => console.log(err));
    }, 300);
  }, [id]);

  function createService(Project) {
    setMessage("");
    const lastService = Project.services[Project.services.length - 1];

    lastService.id = uuidv4();

    const lastServiceCost = lastService.cost;
    const newCost = parseFloat(Project.cost) + parseFloat(lastServiceCost);

    if (newCost > parseFloat(Project.budget)) {
      setMessage("Orçamento Ultrapassado");
      setType("error");
      Project.services.pop();
      return false;
    }
    Project.cost = newCost;

    fetch(`http://localhost:5000/projects/${Project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setShowServiceForm(false);
      })
      .catch((err) => console.log(err));
  }

  function removeService(id, cost) {
    setMessage("");
    const servicesUpdate = Project.services.filter(
      (service) => service.id !== id
    );
    const projectUpdated = Project;

    projectUpdated.services = servicesUpdate;

    projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost);

    fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectUpdated),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(projectUpdated);
        setServices(servicesUpdate);
        setMessage("Serviços removido com sucesso!");
        setType("success");
      })
      .catch((err) => console.log(err));
  }

  function ToogleEventProject() {
    setShowProjectForm(!ShowProjectForm);
  }
  function ToogleServiceProject() {
    setShowServiceForm(!ShowServiceForm);
  }
  function editPost(Project) {
    setMessage("");
    if (Project.budget < Project.cost) {
      setMessage("O orçamento não pode ser menor que o custo do projeto!");
      setType("error");
      return false;
    }
    fetch(`http://localhost:5000/projects/${Project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
        setShowProjectForm(false);
        setMessage("O projeto foi atualizado!");
        setType("success");
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      {Project.name ? (
        <div className="details_Project">
          <Container customClass="column">
            {message && <Message type={type} msg={message} />}
            <div className="details_container">
              <h1>Projeto: {Project.name}</h1>
              <button className="btn" onClick={ToogleEventProject}>
                {!ShowProjectForm ? "Editar Projeto" : "Fechar"}
              </button>
              {!ShowProjectForm ? (
                <div className="form-info">
                  <p>
                    <span>Categoria:</span> {Project.category.name}
                  </p>
                  <p>
                    <span>Total do orçamento:</span> R${Project.budget}
                  </p>
                  <p>
                    <span>Total Utilizado:</span> R${Project.cost}
                  </p>
                </div>
              ) : (
                <div className="form-info">
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText="Concluir Edição"
                    projectData={Project}
                  />
                </div>
              )}
            </div>
            <div className="service_form">
              <h2>Adicione um serviço:</h2>
              <button className="btn" onClick={ToogleServiceProject}>
                {!ShowServiceForm ? "Adicionar Serviço" : "Fechar"}
              </button>
              <div className="form-info">
                {ShowServiceForm && (
                  <ServiceForm
                    handleSubmit={createService}
                    btnText="Adicionar Serviço"
                    projectData={Project}
                  />
                )}
              </div>
            </div>
            <h2>Serviços</h2>
            <Container customClass="grid-layout">
              {services.length > 0 &&
                services.map((service) => (
                  <ServiceCard
                    id={service.id}
                    name={service.name}
                    cost={service.cost}
                    description={service.description}
                    key={service.id}
                    handleRemove={removeService}
                  />
                ))}
              {services.length === 0 && (
                <p>Ainda não há cadastros de novos serviços</p>
              )}
            </Container>
            <Link className="btn" to="/projetos">
              Voltar
            </Link>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default ProjectEdite;
