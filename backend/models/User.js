const mongoose = require('mongoose')
const { Schema } = mongoose;
const UserSchema = new mongoose.Schema({
    
    name: {type: String, required: true, min:2, max: 255},
    surname: {type: String, required: true, min:2, max: 255},
    username: {type: String, required: true, min:4, max: 20},
    password: {type: String, required: true, min:2, max: 255},
    email: {type: String, required: true, min:6, max: 255},
    avatar: {type: String, required: false, min:6, max: 255, default: 'https://anonymous-animals.azurewebsites.net/animal/Dinosaur'},
    projectsAssigned:  [{ type: Schema.Types.ObjectId, ref: 'project', default: null, required: false }],
    joined: {type: Date, required: false, default: Date.now},
    active: {type: Boolean, required: false, default: true},
    admin: {type: Boolean, required: false, default: false}
})

module.exports = mongoose.model('user', UserSchema)