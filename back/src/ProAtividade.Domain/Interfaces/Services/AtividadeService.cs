using ProAtividade.Domain.Entities;
using ProAtividade.Domain.Interfaces.Repositories;

namespace ProAtividade.Domain.Interfaces.Services
{
    public class AtividadeService : IAtividadeService
    {
        private readonly IAtividadeRepo _atividadeRepo;
        public AtividadeService(IAtividadeRepo atividadeRepo)
        {
            _atividadeRepo = atividadeRepo;
        }
        public async Task<Atividade> AdicionarAtividade(Atividade model)
        {
            if (await _atividadeRepo.PegaPorTituloAsync(model.Titulo) != null)
                throw new Exception("Já existe uma atividade com esse titulo");

            if (await _atividadeRepo.PegaPorIdAsync(model.Id) == null)
            {
                _atividadeRepo.Adicionar(model);
                if (await _atividadeRepo.SalvarMudancasAsync())
                    return model;
            }
            return null;
        }

        public async Task<Atividade> AtualizarAtividade(Atividade model)
        {
            if (model.DataConclusao != null)
                throw new Exception("Não se pode alterar atividade concluída");

            if (await _atividadeRepo.PegaPorIdAsync(model.Id) != null)
            {
                _atividadeRepo.Atualizar(model);
                if (await _atividadeRepo.SalvarMudancasAsync())
                    return model;
            }
            return null;
        }

        public async Task<bool> ConcluirAtividade(Atividade model)
        {
            if (model != null)
            {
                model.Concluir();
                _atividadeRepo.Atualizar(model);
                return await _atividadeRepo.SalvarMudancasAsync();
            }
            return false;
        }

        public async Task<bool> DeletarAtividade(int id)
        {
            var atividade = await _atividadeRepo.PegaPorIdAsync(id);
            if (atividade == null)
            {
                throw new Exception("Atividade não existe");
            }
            _atividadeRepo.Deletar(atividade);
            return await _atividadeRepo.SalvarMudancasAsync();
        }

        public async Task<Atividade> PegarAtividadePorIdAsync(int id)
        {
            try
            {
                var atividade = await _atividadeRepo.PegaPorIdAsync(id);
                if (atividade == null)
                {
                    return null;
                }
                return atividade;
            }
            catch (System.Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Atividade[]> PegarTodasAtividadesAsync()
        {
            try
            {
                var atividads = await _atividadeRepo.PegaTodasAsync();
                if (atividads == null)
                {
                    return null;
                }
                return atividads;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}