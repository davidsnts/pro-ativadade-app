import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import api from "../../api/atividade";
import TitlePage from "../../Components/TitlePage";
import AtividadeLista from './AtividadeLista';
import AtividadeForm from './AtividadeForm';
import { Iatividade, Prioridade } from "../../Model/Iatividade";

const atividadeInicial: Iatividade = {
  id: 0,
  titulo: "",
  prioridade: Prioridade.NaoDefino,
  descricao: "",
};

const Atividade = () => {
  const [showAtividadeModal, setShowAtividadeModal] = useState(false);
  const [smShowConfirmModal, setSmShowConfirmModal] = useState(false);

  const [atividades, setAtividades] = useState<Iatividade[]>([]);
  const [AtivSelecionada, setAtividade] = useState<Iatividade>(atividadeInicial);
  

  const handleAtividadeModal = () => setShowAtividadeModal(!showAtividadeModal);
  const handleConfirmModal = (id: number) => {
    if (id !== 0 && id !== undefined) {
      const atividade = atividades.filter((atividade) => atividade.id === id);
      setAtividade(atividade[0]);
    } else setAtividade(atividadeInicial);
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
    setAtividade(atividadeInicial);
  }

  const AtualizarAtividade = async (ativ: Iatividade) => {
    const response = await api.put(`atividade/${ativ.id}`, ativ);
    handleAtividadeModal();
    setAtividades([...response.data]);
  };

  const DeletarAtividade = async (id: number) => {
    const response = await api.delete(`atividade/${id}`);
    handleConfirmModal(0);
    setAtividades([...response.data]);
  };

  const AddAtividade = async (ativ: Iatividade) => {
    const response = await api.post("atividade", ativ);
    atividades.push(response.data);
    setAtividades([...atividades]);
    handleAtividadeModal();
  };

  function PegarAtividade(id: number) {
    const atividade = atividades.filter((atividade) => atividade.id === id);
    handleAtividadeModal();

    setAtividade(atividade[0]);
  }

  function btnAddAtividade() {
    setAtividade(atividadeInicial);
    handleAtividadeModal();
  }
  return (
    <>
      <TitlePage
        title={
          "Atividade " + (AtivSelecionada.id !== 0 ? AtivSelecionada.id : "")
        }
      >
        <Button variant="outline-secondary" onClick={btnAddAtividade}>
          <i className="fas fa-plus" />
        </Button>
      </TitlePage>
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
            CancelarAtividade={CancelarAtividade}
            AddAtividade={AddAtividade}            
            AtivSelecionada={AtivSelecionada}
            AtualizarAtividade={AtualizarAtividade}
          />
        </Modal.Body>
      </Modal>

      <Modal size="sm" show={smShowConfirmModal}>
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

export default Atividade;
