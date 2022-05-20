const express = require('express');
const router = express.Router();
const {verifyToken} = require("../validation");
const Project = require('../models/Project')

//Get all projects routes
router.get('/', async (req, res) => {
    const projects = await Project.find()
    .populate("projectLeader")
    .populate("projectMembers")
    .populate("projectTasks")
    res.json(projects)
})

//-------------------------

//Create new Project
router.post('/new', verifyToken, async (req, res) => {
    
    if(req.params.projectLeader) {
        if(mongoose.Types.ObjectId.isValid(req.params.projectLeader)) {
            const projectLeaderId = mongoose.Types.ObjectId(req.params.projectLeader)
            req.params.projectLeader = projectLeaderId;
        }
    }
    const newProject = new Project(
        req.body//What the vue app is sending throgh the routes
        

        // {
        //     name: "Project test",
        //     description: "A long description text",
        //     template: "Template text",
        // }
    );
    const savedProject = await newProject.save() //saving data to DB
    const newSavedProject = await Project.findById({ _id: savedProject._id })
    .populate("projectLeader")
    .populate("projectMembers")
    .populate("projectTasks")
    res.json(newSavedProject)
})
//Getter by id
router.get('/get/:id', async (req, res) => {
    const t = await Project.findById({ _id: req.params.id })
    res.json(t)
})
//Delete by id
router.delete('/delete/:id', verifyToken, async (req, res) => {
    const tDelete = await Project.findByIdAndDelete({ _id: req.params.id })
    res.json(tDelete)
})

//Update a Project by id
router.put('/update/:id', verifyToken, async (req, res) => {
    const tUpdate = await Project.updateOne(
        { _id: req.params.id },

        { $set: req.body }
        // {
        //     name: "Project test updated",
        //     description: "A long description text updated",
        //     template: "Template text",
        // }
    )
    res.json(tUpdate)
})

//Getter by id
router.get('/get/:id/tasks', async (req, res) => {
    const t = await Project.findById({ _id: req.params.id }, )
    .populate("projectTasks")
    .select("projectTasks")
    res.json(t)
})


module.exports = router
