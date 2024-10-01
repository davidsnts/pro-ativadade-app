using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProAtividade.API.models;

namespace ProAtividade.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AtividadeController : ControllerBase
    {
        public List<Atividade> Atividades = new List<Atividade>(){
            new Atividade(1),
            new Atividade(2),
            new Atividade(3),
        };

        [HttpGet]        
        public IActionResult Get()
        {
            return  Ok(Atividades);
        }
        [HttpGet("{id}")]        
        public IActionResult Get(int id)
        {
            return  Ok(Atividades.FirstOrDefault( f => f.Id == id));
        }

        [HttpPost]        
        public IActionResult Post([FromBody]Atividade atividade)
        {
            Atividades.Add(atividade);
            return  Ok(Atividades);
        }

        [HttpPut("{id}")]         
        public IActionResult Put(int id, [FromBody] Atividade atv)
        {            
            var atividade = Atividades.FirstOrDefault(a => a.Id == id);

            if (atividade != null)
            {
                atividade.Descricao = atv.Descricao;
                atividade.Titulo = atv.Titulo;
                atividade.Prioridade = atv.Prioridade;
            }
            

            return  Ok(Atividades);
        }

        [HttpDelete("{id}")]         
        public IActionResult Delete(int id)
        {
            var atividade = Atividades.FirstOrDefault(a => a.Id == id);
            Atividades.Remove(atividade);
            return  Ok(Atividades);
        }


    }
}