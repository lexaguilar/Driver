IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Users_Rols]') AND parent_object_id = OBJECT_ID(N'[dbo].[Users]'))
ALTER TABLE [dbo].[Users] DROP CONSTRAINT [FK_Users_Rols]
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Users_Areas]') AND parent_object_id = OBJECT_ID(N'[dbo].[Users]'))
ALTER TABLE [dbo].[Users] DROP CONSTRAINT [FK_Users_Areas]
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_RolResources_Rols]') AND parent_object_id = OBJECT_ID(N'[dbo].[RolResources]'))
ALTER TABLE [dbo].[RolResources] DROP CONSTRAINT [FK_RolResources_Rols]
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_RolResources_Resource]') AND parent_object_id = OBJECT_ID(N'[dbo].[RolResources]'))
ALTER TABLE [dbo].[RolResources] DROP CONSTRAINT [FK_RolResources_Resource]
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Registers_TypeLicences]') AND parent_object_id = OBJECT_ID(N'[dbo].[Registers]'))
ALTER TABLE [dbo].[Registers] DROP CONSTRAINT [FK_Registers_TypeLicences]
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Registers_Instructors]') AND parent_object_id = OBJECT_ID(N'[dbo].[Registers]'))
ALTER TABLE [dbo].[Registers] DROP CONSTRAINT [FK_Registers_Instructors]
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Registers_Clients]') AND parent_object_id = OBJECT_ID(N'[dbo].[Registers]'))
ALTER TABLE [dbo].[Registers] DROP CONSTRAINT [FK_Registers_Clients]
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Registers_Areas]') AND parent_object_id = OBJECT_ID(N'[dbo].[Registers]'))
ALTER TABLE [dbo].[Registers] DROP CONSTRAINT [FK_Registers_Areas]
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Receipts_Registers]') AND parent_object_id = OBJECT_ID(N'[dbo].[Receipts]'))
ALTER TABLE [dbo].[Receipts] DROP CONSTRAINT [FK_Receipts_Registers]
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Receipts_Clients]') AND parent_object_id = OBJECT_ID(N'[dbo].[Receipts]'))
ALTER TABLE [dbo].[Receipts] DROP CONSTRAINT [FK_Receipts_Clients]
GO
/****** Object:  Index [IX_Registers_Instructor]    Script Date: 30/04/2021 9:50:29 ******/
IF  EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID(N'[dbo].[Registers]') AND name = N'IX_Registers_Instructor')
DROP INDEX [IX_Registers_Instructor] ON [dbo].[Registers]
GO
/****** Object:  Index [IX_Registers_Client]    Script Date: 30/04/2021 9:50:29 ******/
IF  EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID(N'[dbo].[Registers]') AND name = N'IX_Registers_Client')
DROP INDEX [IX_Registers_Client] ON [dbo].[Registers]
GO
/****** Object:  Index [IX_Registers_Area]    Script Date: 30/04/2021 9:50:29 ******/
IF  EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID(N'[dbo].[Registers]') AND name = N'IX_Registers_Area')
DROP INDEX [IX_Registers_Area] ON [dbo].[Registers]
GO
/****** Object:  Index [IX_Receipts_Register]    Script Date: 30/04/2021 9:50:29 ******/
IF  EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID(N'[dbo].[Receipts]') AND name = N'IX_Receipts_Register')
DROP INDEX [IX_Receipts_Register] ON [dbo].[Receipts]
GO
/****** Object:  Index [IX_Receipts_Reference]    Script Date: 30/04/2021 9:50:29 ******/
IF  EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID(N'[dbo].[Receipts]') AND name = N'IX_Receipts_Reference')
DROP INDEX [IX_Receipts_Reference] ON [dbo].[Receipts]
GO
/****** Object:  Index [IX_Receipts_Client]    Script Date: 30/04/2021 9:50:29 ******/
IF  EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID(N'[dbo].[Receipts]') AND name = N'IX_Receipts_Client')
DROP INDEX [IX_Receipts_Client] ON [dbo].[Receipts]
GO
/****** Object:  Index [IX_Clients_Name]    Script Date: 30/04/2021 9:50:29 ******/
IF  EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID(N'[dbo].[Clients]') AND name = N'IX_Clients_Name')
DROP INDEX [IX_Clients_Name] ON [dbo].[Clients]
GO
/****** Object:  Index [IX_Clients_Identificacion]    Script Date: 30/04/2021 9:50:29 ******/
IF  EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID(N'[dbo].[Clients]') AND name = N'IX_Clients_Identificacion')
DROP INDEX [IX_Clients_Identificacion] ON [dbo].[Clients]
GO
/****** Object:  View [dbo].[vwRegisters]    Script Date: 30/04/2021 9:50:29 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vwRegisters]'))
DROP VIEW [dbo].[vwRegisters]
GO
/****** Object:  View [dbo].[vwReceipts]    Script Date: 30/04/2021 9:50:29 ******/
IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vwReceipts]'))
DROP VIEW [dbo].[vwReceipts]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 30/04/2021 9:50:29 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Users]') AND type in (N'U'))
DROP TABLE [dbo].[Users]
GO
/****** Object:  Table [dbo].[TypeLicences]    Script Date: 30/04/2021 9:50:29 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[TypeLicences]') AND type in (N'U'))
DROP TABLE [dbo].[TypeLicences]
GO
/****** Object:  Table [dbo].[Rols]    Script Date: 30/04/2021 9:50:29 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Rols]') AND type in (N'U'))
DROP TABLE [dbo].[Rols]
GO
/****** Object:  Table [dbo].[RolResources]    Script Date: 30/04/2021 9:50:29 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[RolResources]') AND type in (N'U'))
DROP TABLE [dbo].[RolResources]
GO
/****** Object:  Table [dbo].[Resources]    Script Date: 30/04/2021 9:50:29 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Resources]') AND type in (N'U'))
DROP TABLE [dbo].[Resources]
GO
/****** Object:  Table [dbo].[Registers]    Script Date: 30/04/2021 9:50:29 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Registers]') AND type in (N'U'))
DROP TABLE [dbo].[Registers]
GO
/****** Object:  Table [dbo].[Receipts]    Script Date: 30/04/2021 9:50:29 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Receipts]') AND type in (N'U'))
DROP TABLE [dbo].[Receipts]
GO
/****** Object:  Table [dbo].[Instructors]    Script Date: 30/04/2021 9:50:29 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Instructors]') AND type in (N'U'))
DROP TABLE [dbo].[Instructors]
GO
/****** Object:  Table [dbo].[Clients]    Script Date: 30/04/2021 9:50:29 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Clients]') AND type in (N'U'))
DROP TABLE [dbo].[Clients]
GO
/****** Object:  Table [dbo].[Areas]    Script Date: 30/04/2021 9:50:29 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Areas]') AND type in (N'U'))
DROP TABLE [dbo].[Areas]
GO
/****** Object:  Table [dbo].[Apps]    Script Date: 30/04/2021 9:50:29 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Apps]') AND type in (N'U'))
DROP TABLE [dbo].[Apps]
GO

GO
/****** Object:  Table [dbo].[Apps]    Script Date: 30/04/2021 9:50:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Apps]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Apps](
	[Id] [int] NOT NULL,
	[Price] [money] NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Version] [varchar](50) NULL,
 CONSTRAINT [PK_Apps] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Areas]    Script Date: 30/04/2021 9:50:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Areas]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Areas](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Active] [bit] NOT NULL,
 CONSTRAINT [PK_Areas] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Clients]    Script Date: 30/04/2021 9:50:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Clients]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Clients](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Identification] [varchar](20) NOT NULL,
	[Name] [varchar](100) NOT NULL,
	[SexId] [char](1) NOT NULL,
	[Address] [varchar](250) NULL,
	[PhoneNumber] [varchar](20) NULL,
	[CelularNumber] [varchar](20) NULL,
	[CreateAt] [datetime] NOT NULL,
	[CreateBy] [varchar](50) NOT NULL,
	[ModifyAt] [datetime] NOT NULL,
	[ModifyBy] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Clients] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Instructors]    Script Date: 30/04/2021 9:50:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Instructors]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Instructors](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](150) NOT NULL,
	[PhoneNumber] [varchar](50) NULL,
	[Observation] [varchar](250) NULL,
	[Active] [bit] NOT NULL,
 CONSTRAINT [PK_Instructors] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Receipts]    Script Date: 30/04/2021 9:50:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Receipts]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Receipts](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RegisterId] [int] NOT NULL,
	[ClientId] [int] NOT NULL,
	[Amount] [money] NOT NULL,
	[Date] [datetime] NOT NULL,
	[Balance] [money] NOT NULL,
	[Reference] [varchar](20) NOT NULL,
	[Active] [bit] NOT NULL,
	[Observation] [varchar](250) NULL,
	[CreateAt] [datetime] NOT NULL,
	[CreateBy] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Receipts] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Registers]    Script Date: 30/04/2021 9:50:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Registers]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Registers](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[AreaId] [int] NOT NULL,
	[ClientId] [int] NOT NULL,
	[Categories] [varchar](10) NULL,
	[TypeLicenceId] [int] NOT NULL,
	[SubTotal] [money] NOT NULL,
	[Discount] [money] NOT NULL,
	[Total] [money] NOT NULL,
	[Payoff] [bit] NOT NULL,
	[StartDate] [datetime] NOT NULL,
	[InstructorId] [int] NOT NULL,
	[Observation] [varchar](250) NULL,
	[EndDate] [datetime] NULL,
	[NoteTheoretical] [float] NULL,
	[NotePractice] [float] NULL,
	[DateTheoretical] [datetime] NULL,
	[DatePractice] [datetime] NULL,
	[Acta] [varchar](10) NULL,
	[Folio] [varchar](10) NULL,
	[Book] [varchar](10) NULL,
	[ActaYear] [int] NULL,
	[Active] [bit] NOT NULL,
	[MotiveCancel] [varchar](150) NULL,
	[CreateAt] [datetime] NOT NULL,
	[CreateBy] [varchar](50) NOT NULL,
	[ModifyAt] [datetime] NOT NULL,
	[ModifyBy] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Registers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Resources]    Script Date: 30/04/2021 9:50:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Resources]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Resources](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Description] [varchar](250) NULL,
 CONSTRAINT [PK_Resources] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[RolResources]    Script Date: 30/04/2021 9:50:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[RolResources]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[RolResources](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RolId] [int] NOT NULL,
	[ResourceId] [int] NOT NULL,
	[Action] [int] NOT NULL,
 CONSTRAINT [PK_RolResources] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
/****** Object:  Table [dbo].[Rols]    Script Date: 30/04/2021 9:50:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Rols]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Rols](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Rols] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[TypeLicences]    Script Date: 30/04/2021 9:50:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[TypeLicences]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[TypeLicences](
	[Id] [int] NOT NULL,
	[Name] [varchar](50) NOT NULL,
 CONSTRAINT [PK_TypeLicences] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Users]    Script Date: 30/04/2021 9:50:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Users]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Users](
	[Username] [varchar](50) NOT NULL,
	[FullName] [varchar](150) NOT NULL,
	[Email] [varchar](50) NOT NULL,
	[Password] [varchar](150) NOT NULL,
	[RolId] [int] NOT NULL,
	[AreaId] [int] NOT NULL,
	[Active] [bit] NOT NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[Username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
/****** Object:  View [dbo].[vwReceipts]    Script Date: 30/04/2021 9:50:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vwReceipts]'))
EXEC dbo.sp_executesql @statement = N'CREATE VIEW [dbo].[vwReceipts]
AS
	SELECT r.Id, c.Identification,c.Name,r.Reference,r.Amount, r.[Date],r.Balance,r2.Total,r.[Active],
			r2.AreaId,
	       r.CreateAt, r.CreateBy , r.Observation, r2.Id AS RegisterId
	FROM Receipts AS r
	JOIN Registers AS r2 ON r2.Id = r.RegisterId
	JOIN Clients AS c ON c.Id = r.ClientId

' 
GO
/****** Object:  View [dbo].[vwRegisters]    Script Date: 30/04/2021 9:50:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[vwRegisters]'))
EXEC dbo.sp_executesql @statement = N'





CREATE VIEW [dbo].[vwRegisters]
AS
	SELECT *,(t.total-t.Abonos) AS Balance FROM(
	SELECT 
		r.Id,	
		a.Name AS Sucursal,
		a.Id AS AreaId,
		c.Id AS ClientId,
		c.Identification, c.Name,c.PhoneNumber
		,r.StartDate,
		r.TypeLicenceId,r.Discount,r.SubTotal, r.Total, r.Payoff,
		ISNULL((SELECT SUM (r2.Amount) FROM Receipts AS r2 WHERE r2.RegisterId = r.Id),0) AS Abonos
		,i.Id AS InstructorId,r.CreateAt, r.CreateBy, r.ModifyAt, r.ModifyBy,r.Categories,r.[Active]
	FROM Registers AS r
	JOIN Clients AS c ON c.Id = r.ClientId
	JOIN Areas AS a ON a.Id = r.AreaId
	JOIN Instructors AS i ON i.Id = r.InstructorId
	) AS t






' 
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [IX_Clients_Identificacion]    Script Date: 30/04/2021 9:50:29 ******/
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID(N'[dbo].[Clients]') AND name = N'IX_Clients_Identificacion')
CREATE NONCLUSTERED INDEX [IX_Clients_Identificacion] ON [dbo].[Clients]
(
	[Identification] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [IX_Clients_Name]    Script Date: 30/04/2021 9:50:29 ******/
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID(N'[dbo].[Clients]') AND name = N'IX_Clients_Name')
CREATE NONCLUSTERED INDEX [IX_Clients_Name] ON [dbo].[Clients]
(
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_Receipts_Client]    Script Date: 30/04/2021 9:50:29 ******/
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID(N'[dbo].[Receipts]') AND name = N'IX_Receipts_Client')
CREATE NONCLUSTERED INDEX [IX_Receipts_Client] ON [dbo].[Receipts]
(
	[ClientId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [IX_Receipts_Reference]    Script Date: 30/04/2021 9:50:29 ******/
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID(N'[dbo].[Receipts]') AND name = N'IX_Receipts_Reference')
CREATE UNIQUE NONCLUSTERED INDEX [IX_Receipts_Reference] ON [dbo].[Receipts]
(
	[Reference] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_Receipts_Register]    Script Date: 30/04/2021 9:50:29 ******/
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID(N'[dbo].[Receipts]') AND name = N'IX_Receipts_Register')
CREATE NONCLUSTERED INDEX [IX_Receipts_Register] ON [dbo].[Receipts]
(
	[RegisterId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_Registers_Area]    Script Date: 30/04/2021 9:50:29 ******/
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID(N'[dbo].[Registers]') AND name = N'IX_Registers_Area')
CREATE NONCLUSTERED INDEX [IX_Registers_Area] ON [dbo].[Registers]
(
	[AreaId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_Registers_Client]    Script Date: 30/04/2021 9:50:29 ******/
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID(N'[dbo].[Registers]') AND name = N'IX_Registers_Client')
CREATE NONCLUSTERED INDEX [IX_Registers_Client] ON [dbo].[Registers]
(
	[ClientId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_Registers_Instructor]    Script Date: 30/04/2021 9:50:29 ******/
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID(N'[dbo].[Registers]') AND name = N'IX_Registers_Instructor')
CREATE NONCLUSTERED INDEX [IX_Registers_Instructor] ON [dbo].[Registers]
(
	[InstructorId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Receipts_Clients]') AND parent_object_id = OBJECT_ID(N'[dbo].[Receipts]'))
ALTER TABLE [dbo].[Receipts]  WITH CHECK ADD  CONSTRAINT [FK_Receipts_Clients] FOREIGN KEY([ClientId])
REFERENCES [dbo].[Clients] ([Id])
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Receipts_Clients]') AND parent_object_id = OBJECT_ID(N'[dbo].[Receipts]'))
ALTER TABLE [dbo].[Receipts] CHECK CONSTRAINT [FK_Receipts_Clients]
GO
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Receipts_Registers]') AND parent_object_id = OBJECT_ID(N'[dbo].[Receipts]'))
ALTER TABLE [dbo].[Receipts]  WITH CHECK ADD  CONSTRAINT [FK_Receipts_Registers] FOREIGN KEY([RegisterId])
REFERENCES [dbo].[Registers] ([Id])
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Receipts_Registers]') AND parent_object_id = OBJECT_ID(N'[dbo].[Receipts]'))
ALTER TABLE [dbo].[Receipts] CHECK CONSTRAINT [FK_Receipts_Registers]
GO
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Registers_Areas]') AND parent_object_id = OBJECT_ID(N'[dbo].[Registers]'))
ALTER TABLE [dbo].[Registers]  WITH CHECK ADD  CONSTRAINT [FK_Registers_Areas] FOREIGN KEY([AreaId])
REFERENCES [dbo].[Areas] ([Id])
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Registers_Areas]') AND parent_object_id = OBJECT_ID(N'[dbo].[Registers]'))
ALTER TABLE [dbo].[Registers] CHECK CONSTRAINT [FK_Registers_Areas]
GO
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Registers_Clients]') AND parent_object_id = OBJECT_ID(N'[dbo].[Registers]'))
ALTER TABLE [dbo].[Registers]  WITH CHECK ADD  CONSTRAINT [FK_Registers_Clients] FOREIGN KEY([ClientId])
REFERENCES [dbo].[Clients] ([Id])
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Registers_Clients]') AND parent_object_id = OBJECT_ID(N'[dbo].[Registers]'))
ALTER TABLE [dbo].[Registers] CHECK CONSTRAINT [FK_Registers_Clients]
GO
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Registers_Instructors]') AND parent_object_id = OBJECT_ID(N'[dbo].[Registers]'))
ALTER TABLE [dbo].[Registers]  WITH CHECK ADD  CONSTRAINT [FK_Registers_Instructors] FOREIGN KEY([InstructorId])
REFERENCES [dbo].[Instructors] ([Id])
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Registers_Instructors]') AND parent_object_id = OBJECT_ID(N'[dbo].[Registers]'))
ALTER TABLE [dbo].[Registers] CHECK CONSTRAINT [FK_Registers_Instructors]
GO
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Registers_TypeLicences]') AND parent_object_id = OBJECT_ID(N'[dbo].[Registers]'))
ALTER TABLE [dbo].[Registers]  WITH CHECK ADD  CONSTRAINT [FK_Registers_TypeLicences] FOREIGN KEY([TypeLicenceId])
REFERENCES [dbo].[TypeLicences] ([Id])
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Registers_TypeLicences]') AND parent_object_id = OBJECT_ID(N'[dbo].[Registers]'))
ALTER TABLE [dbo].[Registers] CHECK CONSTRAINT [FK_Registers_TypeLicences]
GO
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_RolResources_Resource]') AND parent_object_id = OBJECT_ID(N'[dbo].[RolResources]'))
ALTER TABLE [dbo].[RolResources]  WITH CHECK ADD  CONSTRAINT [FK_RolResources_Resource] FOREIGN KEY([ResourceId])
REFERENCES [dbo].[Resources] ([Id])
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_RolResources_Resource]') AND parent_object_id = OBJECT_ID(N'[dbo].[RolResources]'))
ALTER TABLE [dbo].[RolResources] CHECK CONSTRAINT [FK_RolResources_Resource]
GO
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_RolResources_Rols]') AND parent_object_id = OBJECT_ID(N'[dbo].[RolResources]'))
ALTER TABLE [dbo].[RolResources]  WITH CHECK ADD  CONSTRAINT [FK_RolResources_Rols] FOREIGN KEY([RolId])
REFERENCES [dbo].[Rols] ([Id])
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_RolResources_Rols]') AND parent_object_id = OBJECT_ID(N'[dbo].[RolResources]'))
ALTER TABLE [dbo].[RolResources] CHECK CONSTRAINT [FK_RolResources_Rols]
GO
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Users_Areas]') AND parent_object_id = OBJECT_ID(N'[dbo].[Users]'))
ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_Users_Areas] FOREIGN KEY([AreaId])
REFERENCES [dbo].[Areas] ([Id])
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Users_Areas]') AND parent_object_id = OBJECT_ID(N'[dbo].[Users]'))
ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [FK_Users_Areas]
GO
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Users_Rols]') AND parent_object_id = OBJECT_ID(N'[dbo].[Users]'))
ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_Users_Rols] FOREIGN KEY([RolId])
REFERENCES [dbo].[Rols] ([Id])
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Users_Rols]') AND parent_object_id = OBJECT_ID(N'[dbo].[Users]'))
ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [FK_Users_Rols]
GO


INSERT [dbo].[Apps] ([Id], [Price], [Name], [Version]) VALUES (1, 130.0000, N'Driver', N'1')
SET IDENTITY_INSERT [dbo].[Areas] ON 
INSERT [dbo].[Areas] ([Id], [Name], [Active]) VALUES (1, N'Huembes', 1)
INSERT [dbo].[Areas] ([Id], [Name], [Active]) VALUES (2, N'Bautista', 1)
SET IDENTITY_INSERT [dbo].[Areas] OFF



SET IDENTITY_INSERT [dbo].[Instructors] ON 
INSERT [dbo].[Instructors] ([Id], [Name], [PhoneNumber], [Observation], [Active]) VALUES (1, N'Sin Asignar', N'00000000', N'', 1)
SET IDENTITY_INSERT [dbo].[Instructors] OFF

SET IDENTITY_INSERT [dbo].[Rols] ON 
INSERT [dbo].[Rols] ([Id], [Name]) VALUES (1, N'Administrador')
SET IDENTITY_INSERT [dbo].[Rols] OFF


SET IDENTITY_INSERT [dbo].[Resources] ON 
INSERT [dbo].[Resources] ([Id], [Name], [Description]) VALUES (1, N'Clientes', N'Administrar clientes')
INSERT [dbo].[Resources] ([Id], [Name], [Description]) VALUES (2, N'Matriculas', N'Registrar matriculas')
INSERT [dbo].[Resources] ([Id], [Name], [Description]) VALUES (3, N'Recibo', N'Administrar recibos de caja')
INSERT [dbo].[Resources] ([Id], [Name], [Description]) VALUES (4, N'Usuarios', N'Administrar usuarios')
INSERT [dbo].[Resources] ([Id], [Name], [Description]) VALUES (5, N'Sucursales', N'Adminsitrar sucursales')
INSERT [dbo].[Resources] ([Id], [Name], [Description]) VALUES (6, N'Instructores', N'Administrar instructores')
INSERT [dbo].[Resources] ([Id], [Name], [Description]) VALUES (7, N'App', N'Modificar precio')
INSERT [dbo].[Resources] ([Id], [Name], [Description]) VALUES (8, N'Ver sucursales', N'Permiso para ver todas las sucursales')
SET IDENTITY_INSERT [dbo].[Resources] OFF

SET IDENTITY_INSERT [dbo].[RolResources] ON 
INSERT [dbo].[RolResources] ([Id], [RolId], [ResourceId], [Action]) VALUES (1, 1, 1, 15)
INSERT [dbo].[RolResources] ([Id], [RolId], [ResourceId], [Action]) VALUES (2, 1, 2, 15)
INSERT [dbo].[RolResources] ([Id], [RolId], [ResourceId], [Action]) VALUES (3, 1, 3, 15)
INSERT [dbo].[RolResources] ([Id], [RolId], [ResourceId], [Action]) VALUES (4, 1, 4, 15)
INSERT [dbo].[RolResources] ([Id], [RolId], [ResourceId], [Action]) VALUES (5, 1, 5, 15)
INSERT [dbo].[RolResources] ([Id], [RolId], [ResourceId], [Action]) VALUES (6, 1, 6, 15)
INSERT [dbo].[RolResources] ([Id], [RolId], [ResourceId], [Action]) VALUES (7, 1, 7, 15)
INSERT [dbo].[RolResources] ([Id], [RolId], [ResourceId], [Action]) VALUES (8, 1, 8, 15)
SET IDENTITY_INSERT [dbo].[RolResources] OFF


INSERT [dbo].[TypeLicences] ([Id], [Name]) VALUES (1, N'Menor de edad')
INSERT [dbo].[TypeLicences] ([Id], [Name]) VALUES (2, N'Ordinaria')

INSERT [dbo].[Users] ([Username], [FullName], [Email], [Password], [RolId], [AreaId], [Active]) VALUES (N'admin', N'Administrador', N'admin@admin.es', N'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 1, 1, 1)