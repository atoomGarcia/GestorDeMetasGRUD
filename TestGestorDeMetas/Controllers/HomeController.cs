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
            List<Meta> lista = _DBContext.Meta.ToList();
            //List<Meta> lista = _DBContext.Meta.Include(c => c.IdMetaNavigation).ToList();
            return View(lista);
        }
    }
}
