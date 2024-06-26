using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace TestGestorDeMetas.Models
{
    public partial class GestorDeMetasContext : DbContext
    {
        public GestorDeMetasContext()
        {
        }

        public GestorDeMetasContext(DbContextOptions<GestorDeMetasContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Meta> Meta { get; set; } = null!;
        public virtual DbSet<Tarea> Tareas { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Meta>(entity =>
            {
                entity.HasKey(e => e.IdMeta)
                    .HasName("PK__Meta__4D7E99908BCE42C4");

                entity.Property(e => e.Estatus).HasDefaultValueSql("((1))");

                entity.Property(e => e.Fecha).HasColumnType("date");

                entity.Property(e => e.Nombre).HasMaxLength(80);
            });

            modelBuilder.Entity<Tarea>(entity =>
            {
                entity.HasKey(e => e.IdTarea)
                    .HasName("PK__Tarea__EADE90984E50E812");

                entity.ToTable("Tarea");

                entity.Property(e => e.Fecha).HasColumnType("date");

                entity.Property(e => e.NombreTarea).HasMaxLength(80);

                entity.HasOne(d => d.IdMetaNavigation)
                    .WithMany(p => p.Tareas)
                    .HasForeignKey(d => d.IdMeta)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Tarea_Meta");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
