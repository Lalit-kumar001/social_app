const express = require('express');
const multer = require('multer');
const postController = require('../controller/postController');
const { requireSignIn } = require('../middleware/Awt.js');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

//for user route
router.use('/user', require('./user.js'));

router.get('/protected',  postController.protected);
router.get('/about', postController.protected);
// router.post('/upload', upload.single('image'), postController.uploadImage);

module.exports = router;
