const express = require('express')
const router = express.Router()
const checkToken = require('../middlewares/auth')
const multer = require('../middlewares/multer')
const sauceCtrl = require('../controllers/sauces')
// =================================

// ====== ROUTES DE MON API. ====== // 
router.get('/', checkToken, sauceCtrl.getAllSauces)
// ==================================
router.get('/:id', checkToken, sauceCtrl.getOneSauce)
// ====================================
router.put('/:id', checkToken, multer, sauceCtrl.modifySauce)
// ===================================
router.post('/', checkToken, multer, sauceCtrl.createSauce);
// ======================================
router.delete('/:id',checkToken, multer, sauceCtrl.deleteSauce)
// ======================================
router.post('/:id/like', checkToken, sauceCtrl.likeSauce)
// ======================================

// ======================================
module.exports = router