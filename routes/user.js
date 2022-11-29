const express = require('express')
const password = require('../middlewares/password')
const userCtrl = require('../controllers/user')
const router = express.Router()
// =====================================
router.post('/signup', password, userCtrl.createUser)
router.post('/login', userCtrl.connectUser)
// ======================================= 
module.exports = router