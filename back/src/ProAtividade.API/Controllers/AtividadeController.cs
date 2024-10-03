using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProAtividade.API.Data;
using ProAtividade.API.models;

namespace ProAtividade.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AtividadeController : ControllerBase
    {
        private readonly DataContext _context;
        public AtividadeController(DataContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.Atividades.ToList());
        }
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_context.Atividades.FirstOrDefault(a => a.Id == id));
        }

        [HttpPost]
        public IActionResult Post([FromBody] Atividade atividade)
        {
            var retorno = _context.Atividades.Add(atividade);
            _context.SaveChanges();
            return Ok(atividade);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Atividade atv)
        {
            if (id != atv.Id)
            {
                return BadRequest("ID mismatch.");
            }

            var atividade = _context.Atividades.FirstOrDefault(a => a.Id == id);



            if (atividade != null)
            {
                atividade.Descricao = atv.Descricao;
                atividade.Titulo = atv.Titulo;
                atividade.Prioridade = atv.Prioridade;
                _context.Atividades.Update(atividade);
                _context.SaveChanges();
            }
            else return NotFound("Não encontrado");


            return Ok(_context.Atividades.ToList());
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var atividade = _context.Atividades.FirstOrDefault(a => a.Id == id);
            if (atividade != null)
            {
                _context.Atividades.Remove(atividade);
                _context.SaveChanges();
            }
            return Ok(_context.Atividades.ToList());
        }
    }
}