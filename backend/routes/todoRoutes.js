import express from "express"
import Todo from "../server.js"

const router = express.Router();

router.get("/", async (req,res)=>{
    const todos = await Todo.find();
    res.json(todos);
});
router.post("/", async(req,res)=>{
    const newTodo = await Todo.create(req.body);
    res.json(newTodo);
});
router.put('/:id', async(req,res)=>{
    const updatedTodo = await Todo.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
        new: true
    })
    res.json(updatedTodo)
})
router.delete('/:id', async(req,res)=>{
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id)
    res.json(deletedTodo)
})
 export default router;
