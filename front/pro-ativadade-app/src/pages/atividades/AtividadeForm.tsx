import { useEffect, useState } from "react";
import { Iatividade, Prioridade } from "../../Model/Iatividade";
import { IAtividadeFormProps } from "../../Model/IAtividadeFormProps";

const atividadeInicial: Iatividade = {
  id: 0,
  titulo: "",
  prioridade: Prioridade.NaoDefino,
  descricao: "",
};

const AtividadeForm: React.FC<IAtividadeFormProps> = ({
  AtivSelecionada,
  AddAtividade,
  AtualizarAtividade,
  CancelarAtividade,
}: IAtividadeFormProps) => {
  const [atividade, setAtividade] = useState<Iatividade>(atividadeAtual);

  useEffect(() => {
    if (AtivSelecionada.id !== 0) {
      setAtividade(AtivSelecionada);
    }
  }, [AtivSelecionada]);

  const handleValue = (e: any) => {
    const { name, value } = e.target;
    setAtividade({ ...atividade, [name]: value });
  };

  function atividadeAtual(): Iatividade {
    if (AtivSelecionada.id !== 0) {
      return AtivSelecionada;
    } else {
      return atividadeInicial;
    }
  }

  const handleCancelar = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    CancelarAtividade();
    setAtividade(atividadeInicial);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (AtivSelecionada.id !== 0) {
      AtualizarAtividade(atividade);
    } else {
      AddAtividade(atividade);
    }

    setAtividade(atividadeInicial);
  };

  return (
    <>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label className="form-label">Título</label>
          <input
            id="titulo"
            type="text"
            className="form-control"
            placeholder="Título"
            value={atividade.titulo}
            onChange={handleValue}
            name="titulo"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Prioridade</label>
          <select
            id="prioridade"
            className="form-select"
            name="prioridade"
            value={atividade.prioridade}
            onChange={handleValue}
          >
            <option defaultValue={1}>Selecionar...</option>
            <option value="Baixa">Baixa</option>
            <option value="Normal">Normal</option>
            <option value="Alta">Alta</option>
          </select>
        </div>

        <div className="col-md-12">
          <label className="form-label">Descrição</label>
          <textarea
            id="descricao"
            className="form-control"
            placeholder="Descrição"
            value={atividade.descricao}
            onChange={handleValue}
            name="descricao"
          />
          <hr />
        </div>

        <div className="col-12 mt-0">
          {atividade.id === 0 ? (
            <button
              className="btn btn-outline-secondary"
              // onClick={props.AddAtividade}
              type="submit"
            >
              <i className="fas fa-plus me-2"></i>
              Salvar
            </button>
          ) : (
            <>
              <button type="submit" className=" me-2 btn btn-outline-success">
                <i className="fas fa-plus me-2"></i>
                Salvar
              </button>

              <button
                className="btn btn-outline-warning"
                onClick={handleCancelar}
              >
                <i className="fas fa-plus me-2"></i>
                Cancelar
              </button>
            </>
          )}
        </div>
      </form>
    </>
  );
};
export default AtividadeForm;
