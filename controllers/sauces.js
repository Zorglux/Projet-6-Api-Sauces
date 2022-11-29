const Sauce = require('../models/sauce')
const fs = require('fs')

exports.getOneSauce = (req,res,next) => {
    Sauce.findOne({ _id: req.params.id})
     .then(sauce => res.status(200).json(sauce))
     .catch(error => res.status(500).json({ error }))
}
// ==============================================
exports.getAllSauces =  (req,res,next) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(404).json({ error }));
}
// ============================================== 
exports.createSauce = (req,res,next) => {
    const sauceParse = JSON.parse(req.body.sauce)
   delete sauceParse._id
   delete sauceParse._userId
   sauceParse.likes = 0
   sauceParse.dislikes = 0
   const sauce = new Sauce({
       ...sauceParse,
       userId: req.checkToken.userId,
       imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
   });
 
   sauce.save()
   .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
   .catch(error => { res.status(400).json({ error }) })
}
// ===============================================
exports.modifySauce = (req,res,next) => {
    const sauceToModify = req.file ? {
          ...JSON.parse(req.body.sauce),
          imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body }
        
       delete sauceToModify._userId
        Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            if(sauce.userId != req.checkToken.userId){ res.status(403).json({ message : "Unauthorized request " }) }
            else { 
                if(req.file === undefined){
                    Sauce.updateOne({ _id: req.params.id}, {...sauceToModify, _id: req.params.id} ) 
                    .then(() => res.status(200).json({ message : "Sauce modifiée ! "}))
                    .catch(error => res.status(400).json({ error }))
                }
                else{
               const fileToDestroy = sauce.imageUrl.split('/images/')[1];
               fs.unlink(`images/${fileToDestroy}`, () => {
                
               Sauce.updateOne({ _id: req.params.id}, {...sauceToModify, _id: req.params.id} ) 
                  .then(() => res.status(200).json({ message : "Sauce modifiée ! "}))
                  .catch(error => res.status(400).json({ error }))
               })
            }
            }
        })
     .catch(error => res.status(500).json({ error }))
}
// =========================================================
exports.deleteSauce = (req,res,next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => {
       if(sauce.userId != req.checkToken.userId){ res.status(403).json({ message: "Unauthorized request"}) }
       else {
           const fileToDestroy = sauce.imageUrl.split('/images/')[1]
           fs.unlink(`images/${fileToDestroy}`, () => {
               Sauce.deleteOne({ _id: req.params.id })
                 .then(() => res.status(200).json({ message: "Sauce supprimée "}))
                 .catch(error => res.status(400).json({ error }))
           })
       }
      })
      .catch( error => res.status(500).json({ error }))
}
// ===================================================
exports.likeSauce = (req,res,next) => {
    Sauce.findOne({ _id: req.params.id})
     .then(sauce => {
      sauce.usersLiked = sauce.usersLiked.filter(userId => userId != req.checkToken.userId)   
      sauce.usersDisliked = sauce.usersDisliked.filter(userId => userId != req.checkToken.userId)
  
  
      switch(req.body.like) {
          case 1: 
          sauce.usersLiked.push(req.checkToken.userId)
          break
  
          case -1:
          sauce.usersDisliked.push(req.checkToken.userId)
          break
      }
      sauce.likes = sauce.usersLiked.length
      sauce.dislikes = sauce.usersDisliked.length
  
      Sauce.updateOne({ _id: req.params.id}, sauce)
       .then(() =>  res.status(201).json({ message : "Like/Dislike ajusté! "}))
       .catch(error => res.status(500).json({ error }))
     })
     .catch(error => res.status(500).json({ error }))
}