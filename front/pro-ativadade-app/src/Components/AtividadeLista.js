import React from "react";
import Atividade from "./Atividade";
export default function AtividadeLista(props) {

    function prioridadeLabel(param) {
    switch (param) {
      case "Baixa":        
      case "Normal":        
      case "Alta":
        return param;
      default:
        return "Não definido";
    }
  }

  function prioridadeStyle(param) {
    switch (param) {
      case "Baixa":
        return "smile";
      case "Normal":
        return "meh";
      case "Alta":
        return "frown";
      default:
        return "Não definido";
    }
  }
  function prioridadeCor(param) {
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
    
    <div>
      <div className="mt-3">
        {
        
        
        props.atividades.map((ativ) => (
          <Atividade
            key={ativ.id}
            prioridadeCor={prioridadeCor}
            ativ={ativ}
            prioridadeStyle={prioridadeStyle}
            prioridadeLabel={prioridadeLabel}
            PegarAtividade = {props.PegarAtividade}
            handleConfirmModal={props.handleConfirmModal}
          />
          
        ))}
      </div>
    </div>
  );
}
