import React from "react";
import Atividade from "./Atividade";
export default function AtividadeLista(props) {

    function prioridadeLabel(param) {
    switch (param) {
      case "1":
        return "Baixa";
      case "2":
        return "Normal";
      case "3":
        return "Alta";
      default:
        return "Não definido";
    }
  }

  function prioridadeStyle(param) {
    switch (param) {
      case "1":
        return "smile";
      case "2":
        return "meh";
      case "3":
        return "frown";
      default:
        return "Não definido";
    }
  }
  function prioridadeCor(param) {
    switch (param) {
      case "1":
        return "success";
      case "2":
        return "secondary";
      case "3":
        return "danger";
      default:
        return "Não definido";
    }
  }
  return (
    
    <div>
      <div className="mt-3">
        {props.atividades.map((ativ) => (
          <Atividade
          key={ativ.id}
            prioridadeCor={prioridadeCor}
            ativ={ativ}
            prioridadeStyle={prioridadeStyle}
            prioridadeLabel={prioridadeLabel}
            DeletarAtividade={props.DeletarAtividade}
            PegarAtividade = {props.PegarAtividade}
          />
        ))}
      </div>
    </div>
  );
}
