using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using TestGestorDeMetas.Models;
using TestGestorDeMetas.Models.ViewModels;

namespace TestGestorDeMetas.Controllers
{
    public class HomeController : Controller
    {
        private readonly GestorDeMetasContext _DBContext;

        public HomeController(GestorDeMetasContext context)
        {
            _DBContext = context;
        }

        public IActionResult Index()
        {
            //List<Meta> lista = _DBContext.Meta.ToList();
            //List<Meta> lista = _DBContext.Meta.Include(t => t.Porcentaje).ToList();
            //return View(lista);

            // Ejecutar la consulta SQL directamente
            var query = @"
            SELECT m.IdMeta, m.Nombre, m.Fecha, m.Estatus, 
            CAST(ROUND(COALESCE((SUM(CASE WHEN t.Estatus = 1 THEN 1 ELSE 0 END) * 100.0) / 
            CASE WHEN COUNT(t.IdTarea) = 0 THEN 1 ELSE COUNT(t.IdTarea) END, 0), 2) AS FLOAT) AS Porcentaje 
            FROM dbo.Meta m 
            LEFT JOIN dbo.Tarea t ON m.IdMeta = t.IdMeta 
            GROUP BY m.IdMeta, m.Nombre, m.Fecha, m.Estatus";

            var listaConPorcentaje = _DBContext.Set<MetaWithPercentage>().FromSqlRaw(query).ToList();

            return View(listaConPorcentaje);
        }
    }
}
