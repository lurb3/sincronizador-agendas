const UsersModel = require("../models/Users")
const WorkbookModel = require("../models/Workbook")

exports.createUser = async (req, res) => {
    const workbook = new WorkbookModel({ title: 'Testinho' });
    workbook.save().then(() => {
        const user = new UsersModel({ name: 'Teste2', date: "10/10/10", hour:"15:28", timezone: "Europe/Lisbon", workbooks: workbook});
        user.save().then(() => res.send("OK"));
    });
}