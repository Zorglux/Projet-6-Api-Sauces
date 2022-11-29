const passwordValidator = require('password-validator')
// =======================================

const passwordSchema = new passwordValidator()

passwordSchema
.is().min(8)                   // Minimum length 8
.is().max(20)                  // Maximum length 100
.has().uppercase()             // Must have uppercase letters
.has().lowercase()             // Must have lowercase letters
.has().digits(2)               // Must have at least 2 digits
.has().not().spaces()          // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values




// ===========================================
module.exports = (req,res,next) => {
if(passwordSchema.validate(req.body.password)){
  next()
}else{
return res.status(400).json({message: `Conditions pour un password valide: 8caractères minimum et 20 maximum/ 1 minuscule minimum/ 1 majuscule minimum/ 2 chiffres minimum/ pas d'espaces` })
 }
}