const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const userSchema = new Schema({
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
    workbooks: {
        type: [
            {
                workbook: {
                    type: ObjectId,
                    ref: "Workbooks"
                }
            }
        ]
    }
}, {collection: "users", timestamps: true})

const user = mongoose.model('User', userSchema);
module.exports = user
