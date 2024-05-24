import LinkButton from "./layout/LinkButton";
import HomeImg from "../../img/homeImg.svg";

function home() {
  return (
    <section className="home_container">
      <h1>
        Seja Bem vindo ao <span>Gerencimento de Projetos!</span>
      </h1>
      <p>Inicie imediatamente a gestão dos seus projetos.</p>
      <LinkButton to="/newProject" text="Criar Projeto" />
      <img src={HomeImg} alt="" />
    </section>
  );
}

export default home;
