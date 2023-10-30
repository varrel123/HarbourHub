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

module.exports = {
    loginFisherman,
    loginTraders,
    register,
    showUser,
    UpdateAccount,
    deleteUser
}