#Rocketseat Experience 2019
#Application: 
#Authors: 
  Abel Babini Filho
  Aline Correia
  Felipe Oliveira
  Nickael Bruzzi
#Date: 2019/11/26


#1. CREATING DOCKER:
docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

#2. LOGIN POSTGRESQL AND CREATE DATABASE NAMED database

#3. RUN MIGRATIONS
yarn sequelize db:migrate

#4. IMPORTING SEEDS TO DATABASE
yarn sequelize db:seed:all

>> Porta de Comunicação 8877


