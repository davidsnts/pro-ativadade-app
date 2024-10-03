import { useState, useEffect } from "react";
import AtividadeForm from "./Components/AtividadeForm";
import AtividadeLista from "./Components/AtividadeLista";
import { Button, Modal } from "react-bootstrap";
import api from "./api/atividade";
import "./App.css";
function App() {
  const [showAtividadeModal, setShowAtividadeModal] = useState(false);
  const [atividades, setAtividades] = useState([]);
  const [AtivSelecionada, setAtividade] = useState({ id: 0 });
  const [smShowConfirmModal, setSmShowConfirmModal] = useState(false);

  const handleAtividadeModal = () => setShowAtividadeModal(!showAtividadeModal);
  const handleConfirmModal = (id) => {
    if (id !== 0 && id !== undefined) {
      const atividade = atividades.filter((atividade) => atividade.id === id);
      setAtividade(atividade[0]);
    }else setAtividade({id:0});
    setSmShowConfirmModal(!smShowConfirmModal);
  };

  const pegaTodasAtividades = async () => {
    const response = await api.get("atividade");
    return response.data;
  };

  useEffect(() => {
    const getAtividades = async () => {
      const todasAtividades = await pegaTodasAtividades();
      if (todasAtividades) {
        setAtividades(todasAtividades);
      }
    };
    getAtividades();
  }, []);

  function CancelarAtividade() {
    handleAtividadeModal();
    setAtividade({ id: 0 });
  }

  const AtualizarAtividade = async (ativ) => {
    const response = await api.put(`atividade/${ativ.id}`, ativ);
    handleAtividadeModal();
    setAtividades([...response.data]);
  };

  const DeletarAtividade = async (id) => {
    const response = await api.delete(`atividade/${id}`);
    handleConfirmModal(0);
    setAtividades([...response.data]);
  };

  const AddAtividade = async (ativ) => {
    const response = await api.post("atividade", ativ);
    atividades.push(response.data);
    setAtividades([...atividades]);
    handleAtividadeModal();
  };

  function PegarAtividade(id) {
    const atividade = atividades.filter((atividade) => atividade.id === id);
    handleAtividadeModal();

    setAtividade(atividade[0]);
  }

  function btnAddAtividade() {
    setAtividade({ id: 0 });
    handleAtividadeModal();
  }
  return (
    <>
      <div className="d-flex justify-content-between align-items-end mt-2 pb-3 border-bottom border-1">
        <h1 className="m-0 p-0">
          Atividade {AtivSelecionada.id !== 0 ? AtivSelecionada.id : ""}
        </h1>
        <Button variant="outline-secondary" onClick={btnAddAtividade}>
          <i className="fas fa-plus" />
        </Button>
      </div>

      <AtividadeLista
        atividades={atividades}
        PegarAtividade={PegarAtividade}
        handleConfirmModal={handleConfirmModal}
      />

      <Modal show={showAtividadeModal} onHide={handleAtividadeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            Atividade {AtivSelecionada.id !== 0 ? AtivSelecionada.id : ""}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AtividadeForm
            handleAtividadeModal={handleAtividadeModal}
            CancelarAtividade={CancelarAtividade}
            AddAtividade={AddAtividade}
            atividades={atividades}
            AtivSelecionada={AtivSelecionada}
            AtualizarAtividade={AtualizarAtividade}
          />
        </Modal.Body>
      </Modal>

      <Modal size="sm" show={smShowConfirmModal} onHide={handleConfirmModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            Excluindo Atividade{" "}
            {AtivSelecionada.id !== 0 ? AtivSelecionada.id : ""}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir a atividade {AtivSelecionada.id}?
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={() => DeletarAtividade(AtivSelecionada.id)}
            className="btn btn-outline-success me-2"
          >
            {" "}
            <i className="fas fa-check me-2"></i> Sim{" "}
          </button>
          <button
            onClick={() => handleConfirmModal(0)}
            className="btn btn-outline-success me-2"
          >
            {" "}
            <i className="fas fa-times me-2"></i> Não{" "}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
