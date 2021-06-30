const mongoose = require('mongoose');

// Création schéma de données grace à la méthode Schema de mongoose, id est généré automatiquement
const thingSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
});


// Exportation du schéma
module.exports = mongoose.model('Thing', thingSchema);