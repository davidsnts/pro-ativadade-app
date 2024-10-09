import { Iatividade } from "./Iatividade";

export interface IAtividadeFormProps{
  AtivSelecionada: Iatividade
  AddAtividade: (atividade: Iatividade) => void;
  AtualizarAtividade: (atividade: Iatividade) => void;
  CancelarAtividade: () => void;
}