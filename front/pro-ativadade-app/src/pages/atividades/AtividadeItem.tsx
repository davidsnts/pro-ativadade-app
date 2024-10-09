import React from "react";
import { IAtividadeItemProps } from "../../Model/IAtividadeItemProps";
import { Prioridade } from "../../Model/Iatividade";

const AtividadeItem: React.FC<IAtividadeItemProps> = ({
  ativ,
  PegarAtividade,
  handleConfirmModal,
}: IAtividadeItemProps) => {
  function prioridadeLabel(param: string) {
    switch (param) {
      case Prioridade.Baixa:
      case Prioridade.Normal:
      case Prioridade.Alta:
        return param;
      default:
        return "Não definido";
    }
  }

  function prioridadeStyle(param: string) {
    switch (param) {
      case Prioridade.Baixa:
        return "smile";
      case Prioridade.Normal:
        return "meh";
      case Prioridade.Alta:
        return "frown";
      default:
        return "Não definido";
    }
  }
  function prioridadeCor(param: string) {
    switch (param) {
      case "Baixa":
        return "success";
      case "Normal":
        return "secondary";
      case "Alta":
        return "danger";
      default:
        return "Não definido";
    }
  }

  return (
    <div
      key={ativ.id}
      className={"card mb-2 shadow-sm border-" + prioridadeCor(ativ.prioridade)}
    >
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5 className="card-title">
            <span className="badge bg-secondary me-1">{ativ.id}</span>-
            {ativ.titulo}
          </h5>
          <h6>
            Prioridade:
            <span
              className={
                "ms-1 text-black text-" + prioridadeCor(ativ.prioridade)
              }
            >
              <i
                className={
                  "me-1 far fa-" +
                  prioridadeStyle(ativ.prioridade) +
                  " text-" +
                  prioridadeCor(ativ.prioridade)
                }
              ></i>
              <span className={"text-" + prioridadeCor(ativ.prioridade)}>
                {prioridadeLabel(ativ.prioridade)}
              </span>
            </span>
          </h6>
        </div>
        <p className="card-text">{ativ.descricao}</p>
        <div className="d-flex justify-content-end pt-2 m-0 border-top">
          <button
            className="btn btn-outline-primary btn-sm me-2 "
            onClick={() => PegarAtividade(ativ.id)}
          >
            <i className="fas fa-pen me-2"></i>
            Editar
          </button>
          <button
            className="btn btn-outline-danger btn-sm me-2"
            onClick={() => handleConfirmModal(ativ.id)}
          >
            <i className="fas fa-trash me-2"></i>
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
};
export default AtividadeItem;
