using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using ProAtividade.Data.Context;
using ProAtividade.Domain.Entities;
using ProAtividade.Domain.Interfaces.Repositories;
using ProAtividade.Domain.Interfaces.Services;


namespace ProAtividade.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AtividadeController : ControllerBase
    {        

        private readonly IAtividadeService _atividadeService;
        
        public AtividadeController(IAtividadeService atividadeService)
        {
            _atividadeService = atividadeService;            
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _atividadeService.PegarTodasAtividadesAsync());
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await _atividadeService.PegarAtividadePorIdAsync(id));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Atividade atividade)
        {
            var retorno = await _atividadeService.AdicionarAtividade(atividade);            
            return Ok(retorno);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Atividade atv)
        {
            if (id != atv.Id)
            {
                return BadRequest("ID mismatch.");
            }

            var atividade = await _atividadeService.PegarAtividadePorIdAsync(atv.Id);

            if (atividade != null)
            {
                atividade.Descricao = atv.Descricao;
                atividade.Titulo = atv.Titulo;
                atividade.Prioridade = atv.Prioridade;
                await _atividadeService.AtualizarAtividade(atividade);
                
            }
            else return NoContent();


            return Ok(await _atividadeService.PegarTodasAtividadesAsync());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var atividade = _atividadeService.PegarAtividadePorIdAsync(id);
            if (atividade != null)
            {
               _atividadeService.DeletarAtividade(id);
            }
            return Ok(await _atividadeService.PegarTodasAtividadesAsync());
        }
    }
}