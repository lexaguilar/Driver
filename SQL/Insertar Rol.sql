select * from [dbo].[ClientClasses]
select * from [dbo].[ClientClassQuestions]

--Agregar el instructor en users

insert into Resources
select 'RegistrarClases','Registrar clases de alumnos'

insert into RolResources
select 1,9,15

insert into RolResources
select 2,9,0

insert into RolResources
select 3,9,0

insert into RolResources
select 4,9,0

insert into RolResources
select 5,9,0