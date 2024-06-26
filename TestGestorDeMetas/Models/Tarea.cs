using System;
using System.Collections.Generic;

namespace TestGestorDeMetas.Models
{
    public partial class Tarea
    {
        public int IdTarea { get; set; }
        public int IdMeta { get; set; }
        public string NombreTarea { get; set; } = null!;
        public string Descripcion { get; set; } = null!;
        public DateTime Fecha { get; set; }
        public int Estatus { get; set; }
        public int Prioridad { get; set; }

        public virtual Meta IdMetaNavigation { get; set; } = null!;
    }
}
