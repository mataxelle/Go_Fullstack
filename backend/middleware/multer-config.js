const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => { // fonction qui indique à multer où enregistrer les fichiers
    callback(null, 'images'); // dans dossier image
  },
  filename: (req, file, callback) => { // fonction indique à multer d'utiliser le nom d'origine
    const name = file.originalname.split(' ').join('_'); // de remplacer les espaces par des underscores
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension); // et ajoute un timeStamp
  }
});


// exportation de multer, lui passer la const storage et lui indiquer que seule les images sont gérés
module.exports = multer({storage: storage}).single('image');