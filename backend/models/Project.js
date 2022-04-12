const mongoose = require('mongoose')
const { Schema } = mongoose;
const ProjectSchema = new mongoose.Schema({
    name: {type: String, required: true, min:2, max: 255},
    description: {type: String, required: false, min:2, max: 255},
    template: {type: String, required: false, min:2, max: 255},
    users: [{ type: Schema.Types.ObjectId, ref: 'user', default: null}],
    tasks: [{ type: Schema.Types.ObjectId, ref: 'task', default: null }]

})

module.exports = mongoose.model('project', ProjectSchema)