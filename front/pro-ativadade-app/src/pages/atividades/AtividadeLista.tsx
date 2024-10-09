import React from "react";
import AtividadeItem from "./AtividadeItem";
import { IAtividadeListaProps }from '../../Model/IAtividadeListaProps'

const AtividadeLista: React.FC<IAtividadeListaProps> = ({
  atividades,
  PegarAtividade,
  handleConfirmModal,
}: IAtividadeListaProps) => {
  return (
    <div>
      <div className="mt-3">
        {atividades.map((ativ) => (
          <AtividadeItem
            key={ativ.id}
            ativ={ativ}
            PegarAtividade={PegarAtividade}
            handleConfirmModal={handleConfirmModal}
          />
        ))}
      </div>
    </div>
  );
};
export default AtividadeLista;
