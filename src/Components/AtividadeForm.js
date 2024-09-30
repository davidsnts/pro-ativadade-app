import { useEffect, useState } from "react";
const atividadeInicial = {
  id: 0,
  titulo: "",
  prioridade: 0,
  descricao: "",
};
export default function AtividadeForm(props) {
  const [atividade, setAtividade] = useState(atividadeAtual);

  useEffect(() => {
    if (props.AtivSelecionada.id !== 0) {
      setAtividade(props.AtivSelecionada);
    }
  }, [props.AtivSelecionada]);

  const inputTextHandler = (e) => {
    const { name, value } = e.target;         
    setAtividade({ ...atividade, [name]: value });
  };

  function atividadeAtual() {
    if (props.AtivSelecionada.id !== 0) {
      return props.AtivSelecionada;
    } else {
      return atividadeInicial;
    }
  }

  const handleCancelar= (e) => { e.preventDefault();
  props.CancelarAtividade();
    setAtividade(atividadeInicial);
  } 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.AtivSelecionada.id !== 0) {
      props.AtualizarAtividade(atividade);
    } else{
      props.AddAtividade(atividade);
    }

    setAtividade(atividadeInicial);
  }

  return (
  <>
    <h1>Atividade {atividade.id !== 0 ? atividade.id : ''}</h1>
    <form className="row g-3" onSubmit={handleSubmit}>
      <div className="col-md-6">
        <label className="form-label">Título</label>
        <input
          id="titulo"
          type="text"
          className="form-control"
          placeholder="Título"
          value={atividade.titulo}
          onChange={inputTextHandler}
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
          onChange={inputTextHandler}
        >
          <option defaultValue={1}>Selecionar...</option>
          <option value="1">Baixa</option>
          <option value="2">Normal</option>
          <option value="3">Alta</option>
        </select>
      </div>

      <div className="col-md-12">
        <label className="form-label">Descrição</label>
        <textarea
          id="descricao"
          type="text"
          className="form-control"
          placeholder="Descrição"
          value={atividade.descricao}
          onChange={inputTextHandler}
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
            Adicionar
          </button>
        ) : (
          <>
            
            <button type="submit" className=" me-2 btn btn-outline-success"> 
            <i className="fas fa-plus me-2"></i>
             Salvar</button>          
            
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
}
