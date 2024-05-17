# express-sequelize-boilerplate

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)

This is a simple boilerplate for building REST APIs in Node.js using Express. Intended for use with PostgreSQL using Sequelize ORM.


## Getting Started



Install the dependencies
```bash
yarn
```

Set the environment variables
```bash
cp .env.example .env
```

Apply migration to database:
```bash
yarn dev_migrate:do
```

Running the server:
```bash
yarn dev
```

## Configuration

Variables for the environment

| Option | Description |
| ------ | ------ |
| PORT | Port the server will run on |
| NODE_ENV | development or production |
| DB_DIALECT | "mysql", "postgresql", among others |
| DB_HOST | Database host |
| DB_USER | Database username |
| DB_PASS | Database password |
| DB_NAME | Database name |

## Commands for sequelize 
```bash
# Creates the database
yarn sequelize db:create 

# Drops the database
yarn sequelize db:drop 

# Load migrations
yarn sequelize db:migrate 

# Undo migrations
yarn sequelize db:migrate:undo:all 

# Load seeders
yarn sequelize db:seed:all
```
