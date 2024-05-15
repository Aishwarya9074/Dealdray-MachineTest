import express from 'express';
import cors from 'cors';
import router from "./routes/index.js";
import mongoose from './db/db.js';
import dotenv from 'dotenv'
dotenv.config({path:'./.env'})
import bodyParser from 'body-parser';


const app=express()
app.use(cors())
// app.use(express.json())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static('public'))
app.use(router)


app.listen(process.env.PORT,()=>{
    console.log("App is running @http://localhost:7000")
})