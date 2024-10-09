import { Iatividade } from "./Iatividade";

export interface IAtividadeListaProps {
  atividades: Iatividade[];
  PegarAtividade: (id: number) => void;
  handleConfirmModal: (id: number) => void;
}