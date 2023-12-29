using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Driver.Models;

public partial class DriverContext : DbContext
{
    public DriverContext()
    {
    }

    public DriverContext(DbContextOptions<DriverContext> options)
        : base(options)
    {
    }

    public virtual DbSet<App> Apps { get; set; }

    public virtual DbSet<Area> Areas { get; set; }

    public virtual DbSet<Checkup> Checkups { get; set; }

    public virtual DbSet<Clase> Clases { get; set; }

    public virtual DbSet<ClaseDetail> ClaseDetails { get; set; }

    public virtual DbSet<Client> Clients { get; set; }

    public virtual DbSet<ClientClass> ClientClasses { get; set; }

    public virtual DbSet<ClientClassQuestion> ClientClassQuestions { get; set; }

    public virtual DbSet<Concept> Concepts { get; set; }

    public virtual DbSet<Discharge> Discharges { get; set; }

    public virtual DbSet<DischargeType> DischargeTypes { get; set; }

    public virtual DbSet<Instructor> Instructors { get; set; }

    public virtual DbSet<LoggedApp> LoggedApps { get; set; }

    public virtual DbSet<PaymentType> PaymentTypes { get; set; }

    public virtual DbSet<Rate> Rates { get; set; }

    public virtual DbSet<Receipt> Receipts { get; set; }

    public virtual DbSet<Register> Registers { get; set; }

    public virtual DbSet<Resource> Resources { get; set; }

    public virtual DbSet<Rol> Rols { get; set; }

    public virtual DbSet<RolResource> RolResources { get; set; }

    public virtual DbSet<TypeLicence> TypeLicences { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<VwClasesClient> VwClasesClients { get; set; }

    public virtual DbSet<VwReceipt> VwReceipts { get; set; }

    public virtual DbSet<VwRegister> VwRegisters { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder){

        if(!optionsBuilder.IsConfigured)
            optionsBuilder.UseSqlServer("Server=SQL5107.site4now.net;Database=db_a13b77_drivertest;User Id=db_a13b77_drivertest_admin;Password=drivertest123;");
    }
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<App>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Price).HasColumnType("money");
            entity.Property(e => e.ProcessesInitDate).HasColumnType("datetime");
            entity.Property(e => e.Version)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Area>(entity =>
        {
            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Checkup>(entity =>
        {
            entity.Property(e => e.Balance).HasColumnType("money");
            entity.Property(e => e.CreateAt).HasColumnType("datetime");
            entity.Property(e => e.CreateBy)
                .IsRequired()
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.DateEnd).HasColumnType("date");
            entity.Property(e => e.DateInit).HasColumnType("date");
            entity.Property(e => e.ModifyAt).HasColumnType("datetime");
            entity.Property(e => e.ModifyBy)
                .IsRequired()
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Rate).HasColumnType("money");
            entity.Property(e => e.TotalIn).HasColumnType("money");
            entity.Property(e => e.TotalOut).HasColumnType("money");

            entity.HasOne(d => d.Area).WithMany(p => p.Checkups)
                .HasForeignKey(d => d.AreaId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Checkups_Area");
        });

        modelBuilder.Entity<Clase>(entity =>
        {
            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<ClaseDetail>(entity =>
        {
            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(150)
                .IsUnicode(false);

            entity.HasOne(d => d.Clase).WithMany(p => p.ClaseDetails)
                .HasForeignKey(d => d.ClaseId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ClaseDetails_Clases");
        });

        modelBuilder.Entity<Client>(entity =>
        {
            entity.HasIndex(e => e.Identification, "IX_Clients_Identificacion");

            entity.HasIndex(e => e.Name, "IX_Clients_Name");

            entity.Property(e => e.Address)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.CelularNumber)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.CreateAt).HasColumnType("datetime");
            entity.Property(e => e.CreateBy)
                .IsRequired()
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Identification)
                .IsRequired()
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.ModifyAt).HasColumnType("datetime");
            entity.Property(e => e.ModifyBy)
                .IsRequired()
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.SexId)
                .IsRequired()
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength();
        });

        modelBuilder.Entity<ClientClass>(entity =>
        {
            entity.Property(e => e.ClassDateTime).HasColumnType("datetime");
            entity.Property(e => e.CreateAt).HasColumnType("datetime");
            entity.Property(e => e.CreateBy)
                .IsRequired()
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Observation)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.SignatureClient)
                .IsRequired()
                .IsUnicode(false);

            entity.HasOne(d => d.Clase).WithMany(p => p.ClientClasses)
                .HasForeignKey(d => d.ClaseId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ClientClasses_Clases");

            entity.HasOne(d => d.Client).WithMany(p => p.ClientClasses)
                .HasForeignKey(d => d.ClientId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ClientClasses_Clients");

            entity.HasOne(d => d.Instructor).WithMany(p => p.ClientClasses)
                .HasForeignKey(d => d.InstructorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ClientClasses_Instructors");
        });

        modelBuilder.Entity<ClientClassQuestion>(entity =>
        {
            entity.Property(e => e.Evaluation).HasColumnType("decimal(18, 0)");

            entity.HasOne(d => d.ClaseQuestion).WithMany(p => p.ClientClassQuestions)
                .HasForeignKey(d => d.ClaseQuestionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ClientClassQuestions_ClaseDetails");

            entity.HasOne(d => d.ClientClass).WithMany(p => p.ClientClassQuestions)
                .HasForeignKey(d => d.ClientClassId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ClientClassQuestions_ClientClasses");
        });

        modelBuilder.Entity<Concept>(entity =>
        {
            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Discharge>(entity =>
        {
            entity.Property(e => e.Amount).HasColumnType("money");
            entity.Property(e => e.CreateAt).HasColumnType("datetime");
            entity.Property(e => e.CreateBy)
                .IsRequired()
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Date).HasColumnType("datetime");
            entity.Property(e => e.Observation)
                .HasMaxLength(500)
                .IsUnicode(false);

            entity.HasOne(d => d.Checkup).WithMany(p => p.Discharges)
                .HasForeignKey(d => d.CheckupId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Checkups_Discharges");

            entity.HasOne(d => d.DischargeType).WithMany(p => p.Discharges)
                .HasForeignKey(d => d.DischargeTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Discharges_types");
        });

        modelBuilder.Entity<DischargeType>(entity =>
        {
            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Instructor>(entity =>
        {
            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.Observation)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<LoggedApp>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__LoggedAp__3214EC072DF45F4B");

            entity.HasIndex(e => e.Name, "name_index");

            entity.Property(e => e.Ip)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.LoggedAt).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.UrlRequest)
                .HasMaxLength(1000)
                .IsUnicode(false);
        });

        modelBuilder.Entity<PaymentType>(entity =>
        {
            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Rate>(entity =>
        {
            entity.HasKey(e => e.Date).HasName("PK__Rates__77387D06FF6B3282");

            entity.Property(e => e.Date).HasColumnType("date");
            entity.Property(e => e.CreateAt).HasColumnType("datetime");
            entity.Property(e => e.Value).HasColumnType("money");
        });

        modelBuilder.Entity<Receipt>(entity =>
        {
            entity.HasIndex(e => e.ClientId, "IX_Receipts_Client");

            entity.HasIndex(e => e.Reference, "IX_Receipts_Reference").IsUnique();

            entity.HasIndex(e => e.RegisterId, "IX_Receipts_Register");

            entity.Property(e => e.Amount).HasColumnType("money");
            entity.Property(e => e.Balance).HasColumnType("money");
            entity.Property(e => e.CreateAt).HasColumnType("datetime");
            entity.Property(e => e.CreateBy)
                .IsRequired()
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Date).HasColumnType("datetime");
            entity.Property(e => e.IsMainPayment)
                .IsRequired()
                .HasDefaultValueSql("((1))");
            entity.Property(e => e.Observation)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.PaymentTypeId).HasDefaultValueSql("((0))");
            entity.Property(e => e.Reference)
                .IsRequired()
                .HasMaxLength(20)
                .IsUnicode(false);

            entity.HasOne(d => d.Client).WithMany(p => p.Receipts)
                .HasForeignKey(d => d.ClientId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Receipts_Clients");

            entity.HasOne(d => d.Concept).WithMany(p => p.Receipts)
                .HasForeignKey(d => d.ConceptId)
                .HasConstraintName("FK_Receipts_Concepts");

            entity.HasOne(d => d.Register).WithMany(p => p.Receipts)
                .HasForeignKey(d => d.RegisterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Receipts_Registers");
        });

        modelBuilder.Entity<Register>(entity =>
        {
            entity.HasIndex(e => e.AreaId, "IX_Registers_Area");

            entity.HasIndex(e => e.ClientId, "IX_Registers_Client");

            entity.HasIndex(e => e.InstructorId, "IX_Registers_Instructor");

            entity.Property(e => e.Acta)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Book)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Categories)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.CreateAt).HasColumnType("datetime");
            entity.Property(e => e.CreateBy)
                .IsRequired()
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.DatePractice).HasColumnType("datetime");
            entity.Property(e => e.DateTheoretical).HasColumnType("datetime");
            entity.Property(e => e.Discount).HasColumnType("money");
            entity.Property(e => e.EndDate).HasColumnType("datetime");
            entity.Property(e => e.Folio)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.ModifyAt).HasColumnType("datetime");
            entity.Property(e => e.ModifyBy)
                .IsRequired()
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.MotiveCancel)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.Observation)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.StartDate).HasColumnType("datetime");
            entity.Property(e => e.SubTotal).HasColumnType("money");
            entity.Property(e => e.Total).HasColumnType("money");

            entity.HasOne(d => d.Area).WithMany(p => p.Registers)
                .HasForeignKey(d => d.AreaId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Registers_Areas");

            entity.HasOne(d => d.Client).WithMany(p => p.Registers)
                .HasForeignKey(d => d.ClientId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Registers_Clients");

            entity.HasOne(d => d.Instructor).WithMany(p => p.Registers)
                .HasForeignKey(d => d.InstructorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Registers_Instructors");

            entity.HasOne(d => d.TypeLicence).WithMany(p => p.Registers)
                .HasForeignKey(d => d.TypeLicenceId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Registers_TypeLicences");
        });

        modelBuilder.Entity<Resource>(entity =>
        {
            entity.Property(e => e.Description)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Rol>(entity =>
        {
            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<RolResource>(entity =>
        {
            entity.HasOne(d => d.Resource).WithMany(p => p.RolResources)
                .HasForeignKey(d => d.ResourceId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RolResources_Resource");

            entity.HasOne(d => d.Rol).WithMany(p => p.RolResources)
                .HasForeignKey(d => d.RolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RolResources_Rols");
        });

        modelBuilder.Entity<TypeLicence>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Username);

            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Email)
                .IsRequired()
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.FullName)
                .IsRequired()
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.Password)
                .IsRequired()
                .HasMaxLength(150)
                .IsUnicode(false);

            entity.HasOne(d => d.Area).WithMany(p => p.Users)
                .HasForeignKey(d => d.AreaId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Users_Areas");

            entity.HasOne(d => d.Rol).WithMany(p => p.Users)
                .HasForeignKey(d => d.RolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Users_Rols");
        });

        modelBuilder.Entity<VwClasesClient>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("VwClasesClient");

            entity.Property(e => e.Clase)
                .IsRequired()
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.ClientName)
                .IsRequired()
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<VwReceipt>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("vwReceipts");

            entity.Property(e => e.Amount).HasColumnType("money");
            entity.Property(e => e.Balance).HasColumnType("money");
            entity.Property(e => e.Concept)
                .IsRequired()
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CreateAt).HasColumnType("datetime");
            entity.Property(e => e.CreateBy)
                .IsRequired()
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Date).HasColumnType("datetime");
            entity.Property(e => e.Efectivo).HasColumnType("money");
            entity.Property(e => e.Identification)
                .IsRequired()
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Observation)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.PaymentType)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Reference)
                .IsRequired()
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Tarjeta).HasColumnType("money");
            entity.Property(e => e.Total).HasColumnType("money");
            entity.Property(e => e.Transferencia).HasColumnType("money");
        });

        modelBuilder.Entity<VwRegister>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("vwRegisters");

            entity.Property(e => e.Abonos).HasColumnType("money");
            entity.Property(e => e.Balance).HasColumnType("money");
            entity.Property(e => e.Book)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Categories)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.CreateAt).HasColumnType("datetime");
            entity.Property(e => e.CreateBy)
                .IsRequired()
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Discount).HasColumnType("money");
            entity.Property(e => e.EndDate).HasColumnType("datetime");
            entity.Property(e => e.Folio)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Identification)
                .IsRequired()
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.ModifyAt).HasColumnType("datetime");
            entity.Property(e => e.ModifyBy)
                .IsRequired()
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.StartDate).HasColumnType("datetime");
            entity.Property(e => e.SubTotal).HasColumnType("money");
            entity.Property(e => e.Sucursal)
                .IsRequired()
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Total).HasColumnType("money");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
