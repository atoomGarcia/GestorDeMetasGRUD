using Microsoft.AspNetCore.Mvc.Rendering;

namespace TestGestorDeMetas.Models.ViewModels
{
    public class MetaVM
    {
        public Meta oMeta { get; set; }
        public List<SelectListItem> oListaMeta { get; set; }

    }
}
