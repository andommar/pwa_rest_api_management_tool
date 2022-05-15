const express = require('express');
const router = express.Router();
const {verifyToken} = require("../validation");
const task = require('../models/Task')

//Get all tasks routes
router.get('/', async (req, res) => {
    const tasks = await task.find(); //Returns all occurrences from datbase
    res.json(tasks)
})

//-------------------------

//Create new task
router.post('/new',verifyToken, async (req, res) => {
    const newtask = new task(
        req.body //What the vue app is sending throgh the routes
        // {
        //     name: "task test",
        //     description: "A long description text",
        //     template: "Template text",
        // }
    );
    const savedtask = await newtask.save() //saving data to DB
    res.json(savedtask)
})
//Getter by id
router.get('/get/:id', async (req, res) => {
    const t = await task.findById({ _id: req.params.id })
    .populate("taskReporter","-password")
    .populate("taskAsignee", "-password")
    .populate("taskMembers", "-password")
    // .select("projectTasks")
    res.json(t)
})
//Delete by id
router.delete('/delete/:id', verifyToken, async (req, res) => {
    const tDelete = await task.findByIdAndDelete({ _id: req.params.id })
    res.json(tDelete)
})

//Update a task by id
router.put('/update/:id', verifyToken, async (req, res) => {
    const tUpdate = await task.updateOne(
        { _id: req.params.id },

        { $set: req.body }
        // {
        //     name: "task test updated",
        //     description: "A long description text updated",
        //     template: "Template text",
        // }
    )
    res.json(tUpdate)
})



module.exports = router
