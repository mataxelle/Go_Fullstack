const Thing = require('../models/thing');
const fs = require('fs'); // file system donne accès aux fonction qui permettent de modifier le système de fichier ou de supprimer les fichiers

exports.createThing = (req, res, next) => {
  const thingObject = JSON.parse(req.body.thing);
  delete thingObject._id;
  const thing = new Thing({
    ...thingObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  thing.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneThing = (req, res, next) => {
  Thing.findOne({
    _id: req.params.id
  }).then(
    (thing) => {
      res.status(200).json(thing);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifyThing = (req, res, next) => {
  const thingObject = req.file ? // on regarde si l'image existe ou pas
    {
      ...JSON.parse(req.body.thing),    // s'il existe, récup des infos sur l'objet comme dans la route post
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // on génère l'url de l'image
    } : { ...req.body }; // s'il existe pas on prend simplement le corps de la requête
  Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => {
      const filename = thing.imageUrl.split('/images/')[1]; // on utilise le fait de savoir que l'url de l'image contient un segment /image/ pour séparer le nom du fichier
      fs.unlink(`images/${filename}`, () => { // on passe le fichier à supprimer à la fonction unlink et le callback a exécuter un fois le fichier supprimé
        Thing.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getAllStuff = (req, res, next) => {
  Thing.find().then(
    (things) => {
      res.status(200).json(things);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};