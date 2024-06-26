using System;
using System.Collections.Generic;

namespace TestGestorDeMetas.Models
{
    public partial class Meta
    {
        public Meta()
        {
            Tareas = new HashSet<Tarea>();
        }

        public int IdMeta { get; set; }
        public string Nombre { get; set; } = null!;
        public DateTime Fecha { get; set; }
        public int Estatus { get; set; }

        public virtual ICollection<Tarea> Tareas { get; set; }
    }
}
