import "../../index.css";
import { Link } from "react-router-dom";
import { BsPencil, BsFillTrashFill } from "react-icons/bs";

function ProjectCard({ id, name, budget, category, handleRemove }) {
  const remove = (e) => {
    e.preventDefault();
    handleRemove(id);
  };

  let categoryClass = "";

  switch (category) {
    case "Infra":
      categoryClass = "infra";
      break;
    case "Desenvolvimento web":
      categoryClass = "desenvolvimento";
      break;
    case "Design":
      categoryClass = "design";
      break;
    case "Backend":
      categoryClass = "backend";
      break;
    case "Landpage":
      categoryClass = "landpage";
      break;
    default:
      categoryClass = "";
  }

  return (
    <div className="project_card">
      <h4>{name}</h4>
      <p>
        <span>Orçamento:</span> R${budget}
      </p>
      <div className="category_content">
        <span className={`category_text ${categoryClass}`}></span> {category}
      </div>
      <div className="buttons_card">
        <Link to={`/project/${id}`}>
          <BsPencil /> Editar
        </Link>
        <button onClick={remove}>
          <BsFillTrashFill />
        </button>
      </div>
    </div>
  );
}

export default ProjectCard;
