export interface Iatividade {
  id: number;
  prioridade: Prioridade;
  titulo: string;
  descricao: string;
}

export enum Prioridade{
  NaoDefino = 'NaoDefino',
  Baixa = 'Baixa',
  Normal = 'Normal',
  Alta = 'Alta'
}