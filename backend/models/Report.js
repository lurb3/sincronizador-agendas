const mongoose = require("mongoose")
const Schema = mongoose.Schema

const reportDataSchema = new Schema({
    title:  String, // String is shorthand for {type: String}
  })

const Report = mongoose.model('Report', reportDataSchema);
module.exports = Report
