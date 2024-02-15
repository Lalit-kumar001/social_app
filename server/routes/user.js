const express = require('express');

const router = express.Router();
const userController=require('../controller/user_controller')
const chatController = require('../controller/Chatcontroller.js')
const verifyToken = require('../middleware/Awt.js')
// const postController = require('../controller/postController');

router.post('/create',userController.signup);
router.post('/login',userController.loginController);
router.post('/uploadPost',verifyToken,userController.createPost);
router.get('/posts',verifyToken,userController.posts);
router.get('/searched',verifyToken,chatController.searchResult);
router.post('/particularchat',verifyToken,chatController.particularChats);
router.get('/history',verifyToken,chatController.history);
router.post('/sendmessage',verifyToken,chatController.sendMessage);
// router.get('/allmessage/:chatId',verifyToken,chatController.fetchAllMessages);
router.get('/allmessage/:chatId', verifyToken, chatController.fetchAllMessages);

module.exports=router;