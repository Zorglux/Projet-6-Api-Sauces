const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv/config')
// =======================================


// ========================================
exports.createUser = (req,res,next) => {
    bcrypt.hash(req.body.password, 12, (err, hash) => {
      if(err) { return res.status(500).json({ error: err }) }
      else { const user = new User ({
               email: req.body.email,
               password: hash
             })
             user.save()
            .then(() => res.status(201).json({ message : "Utilisateur créé ! "}))
            .catch(error => res.status(400).json({ error }))
           }
     })
}
// ====================================
exports.connectUser = (req,res,next) => {
    User.find({ email: req.body.email })
      .then(user => { if (user.length <1) {
              return res.status(401).json({ message: "Mot de passe/Email incorrect"})
       }
       bcrypt.compare(req.body.password, user[0].password, (err,response) => {
        if(err){ return res.status(401).json({ message: "Mot de passe/Email incorrect"}) }
        if(response){
         const token = jwt.sign({ userId: user[0]._id },
                     process.env.JWT_KEY,
                     { expiresIn: "24H"})
          return res.status(200).json({userId: user[0]._id, token: token}) 
        }
        res.status(403).json({ message: "'Mot de passe/Email incorrect"})
       })
      })
      .catch(error => res.status(500).json({ error }) )
}