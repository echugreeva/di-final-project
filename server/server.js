import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
// import jwt from 'jsonwebtoken'
import db from './connections/elephant_db.js'
import router from './routes/data.js'
import userRouter from './routes/userRouter.js'
import cabinetRouter from './routes/cabinetRouter.js'
import teamPageRouter from './routes/teamPageRouter.js'
import path from 'path';

dotenv.config();
const app = express();
const __dirname = path.resolve();

// app.use(cors({credentials:true, origin:'http://localhost:3000'}));
app.use(cors({credentials:true, origin:'https://teamwork-task-management.herokuapp.com'}));

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(router);
app.use(userRouter);
app.use(cabinetRouter);
app.use(teamPageRouter);

app.listen(process.env.PORT||8080,()=>{
    console.log(`run on ${process.env.PORT||8080}`)
})

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});