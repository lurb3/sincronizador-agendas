const TasksController = require("../controllers/TasksController")
const express = require("express")
const router = express.Router()

router.get(
  "/",
  TasksController.createTask
)

module.exports = router
