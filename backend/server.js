import express from 'express';
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import todoRouter from "../backend/routes/todoRoutes.js";

dotenv.config();


const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());
app.use("/todo", todoRouter);

mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log('connected'))
.catch((err)=>console.log(err));

const todoSchema = new mongoose.Schema({
    text: String,
    done: Boolean
});

const Todo = mongoose.model("Todo", todoSchema);

 app.get('/',(req,res)=>{
    res.send('Is server Ready?')
 });


app.listen(port, ()=>
    { console.log(`Server at http:localhost:${port}`)}
);
export default Todo;