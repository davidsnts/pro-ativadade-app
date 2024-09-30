import { useState, useEffect } from "react";
import AtividadeForm from "./Components/AtividadeForm";
import AtividadeLista from "./Components/AtividadeLista";
import "./App.css";

// let initialState = [
//   {
//     id: 1,
//     descricao: "Primeira Ativdade",
//     titulo: "titulo",
//     prioridade: "1",
//   },
//   {
//     id: 2,
//     descricao: "Segunda Atividade",
//     titulo: "titulo",
//     prioridade: "1",
//   },
// ];

function App() {
  const [index, setIndex] = useState(0);
  const [atividades, setAtividades] = useState([]);
  const [AtivSelecionada, setAtividade] = useState({ id: 0});

  useEffect(() => {
    atividades.length <= 0
      ? setIndex(1)
      : setIndex(
          Math.max.apply(
            Math,
            atividades.map((item) => item.id)) + 1)
  }, [atividades])

  function CancelarAtividade() {
    setAtividade({ id: 0 });
  }

  function AtualizarAtividade(ativ) {
    setAtividades(
      atividades.map((item) => (item.id === ativ.id ? ativ : item))
    );
    setAtividade({ id: 0 });
  }

  function DeletarAtividade(id) {
    const atividadesFiltradas = atividades.filter(
      (atividade) => atividade.id !== id
    );
    setAtividades([...atividadesFiltradas]);
  }

  function AddAtividade(ativ) {
    setAtividades([...atividades, { ...ativ, id: index }]);
  }

  function PegarAtividade(id) {
    const atividade = atividades.filter((atividade) => atividade.id === id);
    console.log(atividade);

    setAtividade(atividade[0]);
  }
  return (
    <>
      <AtividadeForm
        CancelarAtividade={CancelarAtividade}
        AddAtividade={AddAtividade}
        atividades={atividades}
        AtivSelecionada={AtivSelecionada}
        AtualizarAtividade={AtualizarAtividade}
      />

      <AtividadeLista
        atividades={atividades}
        DeletarAtividade={DeletarAtividade}
        PegarAtividade={PegarAtividade}        
      />
    </>
  );
}

export default App;
