const express = require('express');
const router = express.Router();
const User = require('../models/User')

//Get all users routes
router.get('/', async (req, res) => {
    const users = await User.find(); //Returns all occurrences from datbase
    res.json(users)
})

//-------------------------

//Create new User
router.post('/new', async (req, res) => {
    const newUser = new User(
        //req.body //What the vue app is sending throgh the routes
        {
            name: "User",
            surname: "Test",
            password: "1234567",
            email: "test@gmail.com",
            role: "Web developer"
        }
    );
    const savedUser = await newUser.save() //saving data to DB
    res.json(savedUser)
})
//Getter by id
router.get('/get/:id', async (req, res) => {
    const t = await User.findById({ _id: req.params.id })
    res.json(t)
})
//Delete by id
router.delete('/delete/:id', async (req, res) => {
    const tDelete = await User.findByIdAndDelete({ _id: req.params.id })
    res.json(tDelete)
})

//Update a User by id
router.put('/update/:id', async (req, res) => {
    const tUpdate = await User.updateOne(
        // { _id: req.params.id },

        // { $set: req.body }
        {
            name: "User update",
            surname: "Test update",
            password: "1234567",
            email: "test@gmail.com",
            role: "Web developer"
        }
    )
    res.json(tUpdate)
})



module.exports = router
