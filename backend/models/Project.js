const mongoose = require('mongoose')
const { Schema } = mongoose;
const ProjectSchema = new mongoose.Schema({
    
    name: {type: String, required: true, min:2, max: 255},
    description: {type: String, required: false, min:2, max: 255},
    template: {type: String, required: false, min:2, max: 255},
    projectTotalHoursAllocated: {type: Number, required: false},
    projectLeader: { type: Schema.Types.ObjectId, ref: 'user', default: null},
    projectMembers: [{ type: Schema.Types.ObjectId, ref: 'user', default: null}],
    projectTasks: [{ type: Schema.Types.ObjectId, ref: 'task', default: null }],
    projectCreationDate: {type: Date, required: false, default: Date.now},
    projectStartDate:{type: Date, required: false},
    projectEndDate:{type: Date, required: false}

})

module.exports = mongoose.model('project', ProjectSchema)