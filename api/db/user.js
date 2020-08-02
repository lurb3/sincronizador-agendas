const createUserModel = db => {
    return {
        findAll() {
            function getRecord() {
                return new Promise(function(resolve) {
                    db.query("SELECT username FROM users", function(erro, rows, fields) {
                        if (erro) {
                            return reject(erro);
                        }
                        return resolve(rows);
                    })
                })
            }
            getRecord().then((result)=> result)

        }
    }
}

module.exports = createUserModel;