const HBService = require('../services/services');

async function loginFisherman(req,res){
    try{
        const result = await HBService.loginFisherman(req.body);
        res.json(result);
    }catch(err){
        res.json(err.detail);
    }
}

async function loginTraders(req,res){
    try{
        const result = await HBService.loginTraders(req.body);
        res.json(result);
    }catch(err){
        res.json(err.detail);
    }
}

async function register(req,res){
    try{
        const result = await HBService.register(req.body);
        res.json(result);
    }catch(err){
        res.json(err.detail);
    }
}

async function showUser(req,res){
    try{
        const result = await HBService.showUser(req.user);
        res.json(result);
    }catch(err){
        res.json(err);
    }
}

async function deleteUser(req,res){
    try{
        const result = await HBService.deleteUser(req.body);
        res.json(result);
    }catch(err){
        res.json(err);
    }
}

async function UpdateAccount(req,res){
    try{
        const result = await HBService.UpdateAccount(req.body);
        res.json(result);
    }catch(err){
        res.json(err.detail);
    }
}

async function AddProduct(req,res){
    try{
        const result = await HBService.AddProduct(req.body);
        res.json(result);
    }catch(err){
        res.json(err.detail);
    }
}

async function ShowProduct(req,res){
    try{
        const result = await HBService.ShowProduct(req.user);
        res.json(result);
    }catch(err){
        res.json(err);
    }
}

async function DeleteProduct(req,res){
    try{
        const result = await HBService.DeleteProduct(req.body);
        res.json(result);
    }catch(err){
        res.json(err);
    }
}

async function UpdateProduct(req,res){
    try{
        const result = await HBService.UpdateProduct(req.body);
        res.json(result);
    }catch(err){
        res.json(err);
    }
}

async function Order(req,res){
    try{
        const result = await HBService.Order(req.body);
        res.json(result);
    }catch(err){
        res.json(err);
    }
}

async function UpdateOrder(req,res){
    try{
        const result = await HBService.UpdateOrder(req.body);
        res.json(result);
    }catch(err){
        res.json(err);
    }
}

async function DeleteOrder(req,res){
    try{
        const result = await HBService.DeleteOrder(req.body);
        res.json(result);
    }catch(err){
        res.json(err);
    }
}

module.exports = {
    loginFisherman,
    loginTraders,
    register,
    showUser,
    UpdateAccount,
    deleteUser,
    AddProduct,
    ShowProduct,
    DeleteProduct,
    UpdateProduct,
    Order,
    UpdateOrder,
    DeleteOrder
};