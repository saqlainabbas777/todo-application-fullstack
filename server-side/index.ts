import express, {Express} from 'express';
import dotenv from 'dotenv';
import {DataSource} from 'typeorm';
import cors from 'cors';
import bodyParser from "body-parser";
// Entities
import {Task} from "./src/tasks/tasks.entity";
import {tasksRouter} from "./src/tasks/tasks.router";


// instantiation express app
const app: Express = express();
dotenv.config();

// parse the body
app.use(bodyParser.json());

// use cors install types as well
app.use(cors())

// create database connection
export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    entities: [Task],
    synchronize: true //it should go ahead to delete and create tables
});

// define server port
const port = process.env.PORT;

AppDataSource.initialize().then(() => {
    // start listening to the request on the defined port
    app.listen(port);
    console.log('data source has been initialized')
}).catch(e => {
    console.log('error', e);
})

// routes definition
app.use('/', tasksRouter)
