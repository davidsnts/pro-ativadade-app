import { Iatividade } from "./Iatividade";

export interface IAtividadeItemProps {
  ativ: Iatividade;
  PegarAtividade: (id: number) => void;
  handleConfirmModal: (id: number) => void;
}
