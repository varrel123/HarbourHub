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

router.delete("/deleteproduct", HBController.DeleteProduct);

router.put("/updateproduct", HBController.UpdateProduct);

router.post("/orders", HBController.Order);

router.put("/updateorders", HBController.UpdateOrder);

router.delete("/deleteorders", HBController.DeleteOrder);

router.post("/addReview", HBController.AddReview);

router.get("/showReview", HBController.ShowReview);

router.put("/updateReview", HBController.UpdateReview);

router.delete("/deleteReview", HBController.DeleteReview);

router.post("/pay", HBController.payment);

module.exports = router;