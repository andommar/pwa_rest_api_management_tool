const express = require('express');
const router = express.Router();
const Project = require('../models/Project')

//Get all projects routes
router.get('/', async (req, res) => {
    const projects = await Project.find(); //Returns all occurrences from datbase
    res.json(projects)
})

//-------------------------

//Create new Project
router.post('/new', async (req, res) => {
    const newProject = new Project(
        req.body //What the vue app is sending throgh the routes
        // {
        //     name: "Project test",
        //     description: "A long description text",
        //     template: "Template text",
        // }
    );
    const savedProject = await newProject.save() //saving data to DB
    res.json(savedProject)
})
//Getter by id
router.get('/get/:id', async (req, res) => {
    const t = await Project.findById({ _id: req.params.id })
    res.json(t)
})
//Delete by id
router.delete('/delete/:id', async (req, res) => {
    const tDelete = await Project.findByIdAndDelete({ _id: req.params.id })
    res.json(tDelete)
})

//Update a Project by id
router.put('/update/:id', async (req, res) => {
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



module.exports = router
