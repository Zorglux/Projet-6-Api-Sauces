const multer = require('multer');
// ==========================================
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    callback(null, name + Date.now());
  }
});
const fileFilter = (req,file,callback) =>{
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
    callback(null, true)
  }else{ callback(null, false) }
}
// ====================================================
module.exports = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5},
  fileFilter: fileFilter
}).single('image');