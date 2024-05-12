const express = require('express');
const router = express.Router()
const userController = require("../controller/userController")

router.post('/',userController.createUser)
router.get('/',userController.getUsers)
router.get('/distribute',userController.getDistributeEarnings)
router.post('/distribute',userController.distributeEarnings)
module.exports = router