const mongoose = require('mongoose')
const { Schema } = mongoose;
const UserSchema = new mongoose.Schema({
    
    name: {type: String, required: true, min:2, max: 255},
    surname: {type: String, required: true, min:2, max: 255},
    password: {type: String, required: true, min:2, max: 255},
    email: {type: String, required: true, min:6, max: 255},
    projectsAssigned:  [{
                        project:{ type: Schema.Types.ObjectId, ref: 'project', default: null, required: false },
                        role:{type: String, required: false, min:2, max: 255}
    }]
})

module.exports = mongoose.model('user', UserSchema)