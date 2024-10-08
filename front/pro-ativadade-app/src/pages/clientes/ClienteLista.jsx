import React, { useState } from "react";
import TitlePage from "../../Components/TitlePage";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export default function ClienteLista() {
  const clientes = [
    {
      id: 1,
      nome: "Microsoft",
      responsavel: "Otto",
      contato: 10442233,
      situacao: "Ativo",
    },
    {
      id: 2,
      nome: "Amazon",
      responsavel: "Kevin",
      contato: 14442222,
      situacao: "Desativado",
    },
    {
      id: 3,
      nome: "Google",
      responsavel: "Carlos",
      contato: 12243535,
      situacao: "Ativo",
    },
    {
      id: 4,
      nome: "Facebook",
      responsavel: "Sam",
      contato: 15542654,
      situacao: "Ativo",
    },
    {
      id: 5,
      nome: "Twitter",
      responsavel: "Jack",
      contato: 14542232,
      situacao: "Ativo",
    },
  ];
  const [termoBusca, setTermoBusca] = useState("");
  const handleInputChange = (e) => {
    setTermoBusca(e.target.value);
  };
  const clientesFiltrados = clientes.filter((cliente) => {
    return (
      // cliente.nome.toLocaleLowerCase().indexOf(termoBusca) !== -1 ||
      // cliente.responsavel.toLocaleLowerCase().indexOf(termoBusca) !== -1
      Object.values(cliente).join(' ').toLocaleLowerCase().indexOf(termoBusca) !== -1
    );
  });
  const navigate = useNavigate(); 
  const novoCliente = () => {
    navigate("/cliente/detalhe"); 
  };

  return (
    <>
      <TitlePage title="Cliente Lista"> <Button variant="outline-secondary" onClick={novoCliente}><i className="fas fa-plus me-2"/>Novo cliente</Button></TitlePage>

      <InputGroup className="mt-3 mb-3">
        <InputGroup.Text className="">Buscar:</InputGroup.Text>
        <Form.Control
          onChange={handleInputChange}
          placeholder="Buscar por nome do cliente"
        />
      </InputGroup>

      <table className="table table-striped table-hover">
        <thead className="table-dark mt-3">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nome</th>
            <th scope="col">Responsável</th>
            <th scope="col">Contato</th>
            <th scope="col">Situação</th>
            <th scope="col">Opções</th>
          </tr>
        </thead>
        <tbody>
          {clientesFiltrados.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nome}</td>
              <td>{cliente.responsavel}</td>
              <td>{cliente.contato}</td>
              <td>{cliente.situacao}</td>
              <td>
                <div>
                  <button className="btn btn-sm btn-outline-primary me-2" onClick={() => navigate(`/cliente/detalhe/${cliente.id}`)}>
                    <i className="fas fa-user-edit me-2"></i>Editar
                  </button>
                  <button className="btn btn-sm btn-outline-danger me-2">
                    <i className="fas fa-user-times me-2"></i>Desativar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
