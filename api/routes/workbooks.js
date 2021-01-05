const WorkbooksController = require("../controllers/WorkbooksController")
const express = require("express")
const router = express.Router()

router.get(
  "/",
  WorkbooksController.createWorkbook
)

module.exports = router
