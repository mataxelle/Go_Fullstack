const express = require('express');

const router = express.Router(); // Création routeur Express

//https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg

const stuffCtrl = require('../controllers/stuff');

router.get('/', stuffCtrl.getAllStuff);
router.post('/', stuffCtrl.createThing);
router.get('/:id', stuffCtrl.getOneThing);
router.put('/:id', stuffCtrl.modifyThing);
router.delete('/:id', stuffCtrl.deleteThing);



module.exports = router;