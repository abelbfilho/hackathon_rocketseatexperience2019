<h1>Hackathon - Education</h1>
<h2>Rocketseat Experience 2019</h2>
#
#Application: 
Description: 
#Authors: 
  Abel Babini Filho
  Aline Correia
  Felipe Oliveira
  Nickael Bruzzi
#Date: 2019/11/26



#1. CREATING DOCKER:
<blockquote>docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres </blockquote>

#2. LOGIN POSTGRESQL AND CREATE DATABASE NAMED database

#3. RUN MIGRATIONS
<blockquote>yarn sequelize db:migrate</blockquote>

#4. IMPORTING SEEDS TO DATABASE
<i>yarn sequelize db:seed:all</i>

>> Porta de Comunicação 8877

#5. CRIAR USUARIO VIA INSOMNIA
Rota: /users
{
	"name": "Abel",
	"lastname": "Filho",
	"email": "abel.filho@babini.com.br",
	"state": "SP",
	"city": "Itatiba",
	"phone": "+551199999999",
	"password": "12345678"
}


