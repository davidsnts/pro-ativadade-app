import React from "react";

export default function AtividadeItem(props) {
  return (
    <div
      key={props.ativ.id}
      className={
        "card mb-2 shadow-sm border-" +
        props.prioridadeCor(props.ativ.prioridade)
      }
    >
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5 className="card-title">
            <span className="badge bg-secondary me-1">{props.ativ.id}</span>-
            {props.ativ.titulo}
          </h5>
          <h6>
            Prioridade:
            <span
              className={
                "ms-1 text-black text-" +
                props.prioridadeCor(props.ativ.prioridade)
               
                
              }
            >
              <i
                className={
                  "me-1 far fa-" + props.prioridadeStyle(props.ativ.prioridade)+ " text-" + props.prioridadeCor(props.ativ.prioridade)
                }
              ></i>
              <span
                className={"text-" + props.prioridadeCor(props.ativ.prioridade)}
              >
                {props.prioridadeLabel(props.ativ.prioridade)}
              </span>
            </span>
          </h6>
        </div>
        <p className="card-text">{props.ativ.descricao}</p>
        <div className="d-flex justify-content-end pt-2 m-0 border-top">
          <button className="btn btn-outline-primary btn-sm me-2 "
          onClick={() => props.PegarAtividade(props.ativ.id)}
          >
            <i className="fas fa-pen me-2"></i>
            Editar
          </button>
          <button
            className="btn btn-outline-danger btn-sm me-2"
            onClick={() => props.handleConfirmModal(props.ativ.id)}
          >
            <i className="fas fa-trash me-2"></i>
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
}
