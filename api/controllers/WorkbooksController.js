const WorkbookModel = require("../models/Workbook")

exports.createWorkbook = async (req, res) => {
    const workbook = new WorkbookModel({ title: 'Zildjian' });
    workbook.save().then(() => res.send(workbook));
}