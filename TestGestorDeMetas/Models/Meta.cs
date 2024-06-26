using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

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

        [NotMapped]
        public double Porcentaje { get; set; }

        public virtual ICollection<Tarea> Tareas { get; set; }

        
    }
}
