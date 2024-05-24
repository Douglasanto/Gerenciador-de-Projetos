import { BsFillTrashFill } from "react-icons/bs";
import "../../index.css";

function ServiceCard({ name, id, description, handleRemove, cost }) {
  const remove = (e) => {
    e.preventDefault();
    handleRemove(id, cost);
  };
  return (
    <div className="project_card">
      <h4>{name}</h4>
      <p>
        <span>Custo Total:</span> R${cost}
      </p>
      <p>{description}</p>
      <div className="buttons_card">
        <button onClick={remove}>
          <BsFillTrashFill />
          Excluir
        </button>
      </div>
    </div>
  );
}

export default ServiceCard;
