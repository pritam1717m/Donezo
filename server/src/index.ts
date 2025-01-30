import express from 'express'
import cors from 'cors'
import dbConnect from './db/connection';
import dotenv from 'dotenv';
import authRoute from './routes/auth/index';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/auth", authRoute);
// app.use("/todo", )

dbConnect(process.env.MONGO_URI || "")
app.listen(port, () => {
    console.log(`Server is listening on PORT : ${port}`)
})