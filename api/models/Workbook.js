const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const workbookSchema = new Schema({
    name: {
        type: String
    },
    date: {
        type: String
    },
    hour: {
        type: String
    },
    timezone: {
        type: String
    },
    tasks: {
        type: [
            {
                task: {
                    type: ObjectId,
                    ref: "Tasks"
                }
            }
        ]
    }
}, {collection: "workbooks", timestamps: true})

const workbook = mongoose.model('Workbook', workbookSchema);
module.exports = workbook
