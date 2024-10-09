import Atividade from "./pages/atividades/Atividade";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Cliente from "./pages/clientes/Cliente";
import Dashboard from "./pages/dashboard/Dashboard";
import ClienteForm from "./pages/clientes/ClienteForm";
import PageNotFound from "./pages/PageNotFound";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/atividade/lista" element={<Atividade />} />
      <Route path="/cliente/lista" element={<Cliente />} />
      <Route path="/cliente/detalhe/:id?" element={<ClienteForm />} />
      <Route  path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;