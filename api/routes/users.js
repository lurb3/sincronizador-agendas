const UsersController = require("../controllers/UsersController")
const express = require("express")
const router = express.Router()

router.post(
  "/createUser",
  UsersController.createUser
)

module.exports = router
