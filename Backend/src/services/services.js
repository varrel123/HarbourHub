const res = require('express/lib/response');
const db = require('../configs/DBconfig');
const helper = require('../utils/bcrypt');

async function loginFisherman(mm) {
    const { Email, Password } = mm;
    const query = `SELECT * FROM Account WHERE Email = '${Email}' AND Role = 'FisherMan'`;
    const result = await db.query(query);
    if (result.rowCount > 0) {
        const user = result.rows[0];
        const comparePass = await helper.comparePassword(Password, user.password);
        if (comparePass) {
          return { message: 'Login successful', user };
        } else {
          return { message: 'Password is not correct' };
        }
    } else {
        return { message: 'Account not found' };
    }
  }

  async function loginTraders(mm) {
    const { Email, Password } = mm;
    const query = `SELECT * FROM Account WHERE Email = '${Email}' AND Role = 'Traders'`;
    const result = await db.query(query);
    if (result.rowCount > 0) {
        const user = result.rows[0];
        const comparePass = await helper.comparePassword(Password, user.password);
        if (comparePass) {
          return { message: 'Login successful', user };
        } else {
          return { message: 'Password is not correct' };
        }
    } else {
        return { message: 'Account not found' };
    }
  }
  

async function showUser() {
    const query = 'SELECT * FROM Account';
    const result = await db.query(query);
  
    if (result.rowCount > 0) {
      return {
        message: 'Accounts found',
        accounts: result.rows,
      };
    } else {
      return {
        message: 'No Accounts found',
      };
    }
}

async function register (mm){
    const { Name, Email, Password, Address, Phone, Role } = mm;
    const pass = await helper.hashPassword(Password);
    const query = `INSERT INTO Account (Name, Email, Password, Address, Phone, Role) VALUES ('${Name}', '${Email}', '${pass}', '${Address}', '${Phone}', '${Role}')`;
    const result = await db.query(query);
    if(result.rowCount === 1){
        return {
            message: 'Account Created'
        }
    }else{
        return{
            message: 'Error'
        } 
    }
}

async function deleteUser (mm){
    const {Email} = mm;
    const query = `DELETE FROM Account WHERE Email = '${Email}'`;
    const result = await db.query(query);
    if(result.rowCount === 1){
        return {
            message: 'Account deleted'
        }
    }
    else{
        return {
             message: 'Account not found'
           }
    }
}

async function UpdateAccount (mm){
  const {accountid, Name, Email, Password, Address, Phone, Role } = mm;
  const pass = await helper.hashPassword(Password);
  const query = `UPDATE Account SET accountid = '${accountid}', Name = '${Name}' , Email = '${Email}',Password = '${pass}',Address = '${Address}',Phone = '${Phone}',Role = '${Role}' WHERE accountid = '${accountid}' `;
  const result = await db.query(query);
  if(result.rowCount === 1){
      return {
          message: 'Product account successful'
      }
  }else{
      return{
          message: 'Error'
      } 
  }
}

async function AddProduct(mm) {
  const {productname, productcost, accountid, posteddate, description, catchdate} = mm;
  const query = `INSERT INTO Product (productname, productcost, accountid, posteddate, description, catchdate) VALUES ('${productname}', '${productcost}', '${accountid}','${posteddate}', '${description}', '${catchdate}')`;
  console.log(query)
  const result = await db.query(query);
  
  if(result.rowCount === 1){
    return {
        message: 'Product Added'
    }
}else{
    return{
        message: 'Failed'
    } 
}
}

async function ShowProduct() {
  const query = 'SELECT * FROM Product';
  const result = await db.query(query);

  if (result.rowCount > 0) {
    return {
      message: 'Product found',
      accounts: result.rows,
    };
  } else {
    return {
      message: 'No Product Added',
    };
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
    ShowProduct
}