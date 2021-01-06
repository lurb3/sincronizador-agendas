const UsersModel = require("../models/Users")
const passwordHash = require('password-hash');
//const WorkbookModel = require("../models/Workbook")

exports.createUser = async (req, res) => {
    /*const workbook = new WorkbookModel({ title: 'Testinho' });
    workbook.save().then(() => {
        const user = new UsersModel({ name: 'Teste2', date: "10/10/10", hour:"15:28", timezone: "Europe/Lisbon", workbooks: workbook});
        user.save().then(() => res.send("OK"));
    });*/
    const { login, name, password, role } = req.body
    
    const findDup = await UsersModel.findOne({user: login})
    if(findDup) {
        return res.status(403).send("User already exist")
    } else {
        const user = new UsersModel({ 
            user: login,
            name: name,
            password: password,
            role: role || 0,
            date: "10/10/10",
            hour:"15:28",
            timezone: "Europe/Lisbon"});
        user.save().then(() => res.send("New user created"));
    }
}

exports.findUser = async (req, res) => {
    const { login, password } = req.body
    const user = await UsersModel.findOne({user: login})
    if(!user) return res.status(404).send("User not found")
    
    user.comparePassword(password, ((err, isMatch) => {
        if(err) {
            return res.status(500).send("Could not log in")
        }
        if(isMatch) {
            return res.send("User loged in")
        } else {
            return res.status(403).send("Incorrect login or password")
        }
    }))
}