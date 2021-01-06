const UsersModel = require("../models/Users")
const passwordHash = require('password-hash');
//const WorkbookModel = require("../models/Workbook")

exports.createUser = async (req, res) => {
    /*const workbook = new WorkbookModel({ title: 'Testinho' });
    workbook.save().then(() => {
        const user = new UsersModel({ name: 'Teste2', date: "10/10/10", hour:"15:28", timezone: "Europe/Lisbon", workbooks: workbook});
        user.save().then(() => res.send("OK"));
    });*/
    const { login, name, password } = req.body
    
    const findDup = await UsersModel.findOne({user: login})
    if(findDup) {
        res.status(403).send("User already exist")
    } else {
        const user = new UsersModel({ 
            user: login,
            name: name,
            password: password,
            date: "10/10/10",
            hour:"15:28",
            timezone: "Europe/Lisbon"});
        user.save().then(() => res.send("New user created"));
    }
}

exports.findUser = async (req, res) => {
    UsersModel.findOne({user: 'lirb3'}, ((err, user) => {
        if(err) res.send("User not found")
        user.comparePassword('abc12', ((err, isMatch) => {
            if(err) {
                res.send("Internal Error")
            }
            if(isMatch) {
                res.send("OK")
            } else {
                res.send("Wrong Password")
            }
        }))
    }))
}