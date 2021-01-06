const mongoose = require("mongoose")
const Schema = mongoose.Schema

const taskSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    status: {
        type: String
    },
    insertDate: {
        type: Date
    },
    updateDate: {
        type: Date
    },
    archiveDate: {
        type: Date
    },
}, {collection: "tasks", timestamps: true})

const task = mongoose.model('Task', taskSchema);
module.exports = task
