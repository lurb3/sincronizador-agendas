module.exports = {
    Query: {
        users(_, __, { models }) {
            return models.User.findAll()
        }
    },

    User: {
        /*username(id, _, {models}) {
            return models.User.findAll()
        }*/
    }
}