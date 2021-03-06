const mongoose = require('mongoose')
const { Schema } = mongoose;
const TaskSchema = new mongoose.Schema({
    
    title: {type: String, required: true, min:5, max: 255},
    description: {type: String, required: false, min:5, max: 255},
    hoursAllocated: {type: Number, required: false, default: 0},
    hoursLogged: {type: Number, required: false, default: 0},
    hoursRemainig: {type: Number, required: false, default: 0},
    taskKanbanStatus: {type: String, required: true, min:3, max: 255},
    is_closed: {type: Boolean, required: true, default: false},
    taskMembers: [{ type: Schema.Types.ObjectId, ref: 'user', default: null}],
    taskReporter: { type: Schema.Types.ObjectId, ref: 'user', default: null},
    taskAsignee: { type: Schema.Types.ObjectId, ref: 'user', default: null},
    taskCreation:{type: Date, required: false, default: Date.now},
    taskStartDate:{type: Date, required: false, default: Date.now},
    taskEndDate:{type: Date, required: false, default: Date.now}
    // informer: {type: String, required: true, min:3, max: 255},
    // responsible: {type: String, required: true, min:3, max: 255}

})

module.exports = mongoose.model('task', TaskSchema)