const mongoose = require('mongoose')
const TaskSchema = new mongoose.Schema({
    title: {type: String, required: true, min:5, max: 255},
    description: {type: String, required: false, min:5, max: 255},
    total_hours: {type: Number, required: false},
    logged_hours: {type: Number, required: false},
    status: {type: String, required: true, min:3, max: 255},
    is_closed: {type: Boolean, required: true}
    // informer: {type: String, required: true, min:3, max: 255},
    // responsible: {type: String, required: true, min:3, max: 255}

})

module.exports = mongoose.model('task', TaskSchema)