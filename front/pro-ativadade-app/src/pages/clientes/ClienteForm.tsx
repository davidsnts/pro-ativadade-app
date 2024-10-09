import React from "react";
import TitlePage from "../../Components/TitlePage";
import { useNavigate, useParams } from "react-router-dom";

const ClienteForm = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const acaoVoltar = () => {
    navigate(-1);
  };

  return (
    <>
      <TitlePage title={"Cliente Detalhes " + (id !== undefined ? id : "")}>
        <button className="btn btn-outline-secondary me-2" onClick={acaoVoltar}>
          {" "}
          <i className="fas fa-arrow-left me-2"></i>Voltar
        </button>
      </TitlePage>
      <div></div>
    </>
  );
};
export default ClienteForm;
