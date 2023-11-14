const express = require('express');
const router = express.Router();
const HBController = require('../controllers/controllers.js');

router.post('/loginFisherman', HBController.loginFisherman);

router.post('/loginTraders', HBController.loginTraders);

router.post('/register', HBController.register);

router.get('/showuser', HBController.showUser);

router.delete('/deleteaccount', HBController.deleteUser);

router.put("/updateaccount", HBController.UpdateAccount);

router.post("/addproduct", HBController.AddProduct);

router.get("/showproduct", HBController.ShowProduct);

module.exports = router;