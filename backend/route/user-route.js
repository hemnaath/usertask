const userController = require('../controller/user-controller');
const express = require('express');
const passport = require('../middleware/auth-middleware');



const router = express.Router();

router.post('/create-user', passport.authenticate('jwt', { session: false }), userController.createUser);
router.post('/login',userController.login);
router.post('/register',userController.register);
router.get('/read-user', passport.authenticate('jwt', { session: false }), userController.readUser);
router.get('/read-user-by-id/:id', passport.authenticate('jwt', { session: false }), userController.readUserById);
router.delete('/delete-user/:id', passport.authenticate('jwt', { session: false }), userController.deleteUser);
router.put('/update-user/:id', passport.authenticate('jwt', { session: false }), userController.updateUser);

module.exports = router;