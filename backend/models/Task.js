const mongoose = require('mongoose')
const { Schema } = mongoose;
const TaskSchema = new mongoose.Schema({
    
    title: {type: String, required: true, min:5, max: 255},
    description: {type: String, required: false, min:5, max: 255},
    hoursAllocated: {type: Number, required: false},
    hoursLogged: {type: Number, required: false},
    hoursRemainig: {type: Number, required: false},
    taskKanbanStatus: {type: String, required: true, min:3, max: 255},
    is_closed: {type: Boolean, required: true, default: false},
    taskMembers: [{ type: Schema.Types.ObjectId, ref: 'user', default: null}],
    taskReporter: { type: Schema.Types.ObjectId, ref: 'user', default: null},
    taskAsignee: { type: Schema.Types.ObjectId, ref: 'user', default: null},
    taskStartDate:{type: Date, required: false},
    taskEndDate:{type: Date, required: false}
    // informer: {type: String, required: true, min:3, max: 255},
    // responsible: {type: String, required: true, min:3, max: 255}

})

module.exports = mongoose.model('task', TaskSchema)