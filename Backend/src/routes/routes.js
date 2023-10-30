const express = require('express');
const router = express.Router();
const HBController = require('../controllers/controllers');

router.post('/loginFisherman', HBController.loginFisherman);

router.post('/loginTraders', HBController.loginTraders);

router.post('/register', HBController.register);

router.get('/showaccount', HBController.showUser);

router.delete('/deleteaccount', HBController.deleteUser);

router.put("/updateaccount", HBController.UpdateAccount);

module.exports = router;