const mongoose = require('mongoose')
const ProjectSchema = new mongoose.Schema({
    name: {type: String, required: true, min:2, max: 255},
    description: {type: String, required: false, min:2, max: 255},
    template: {type: String, required: false, min:2, max: 255}

})

module.exports = mongoose.model('project', ProjectSchema)