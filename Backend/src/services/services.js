const res = require('express/lib/response');
const db = require('../configs/DBconfig');
const helper = require('../utils/bcrypt.js');

// account
async function loginFisherman(temp) {
    const { Email, Password } = temp;
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

  async function loginTraders(temp) {
    const { Email, Password } = temp;
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

async function register (temp){
    const { Name, Email, Password, Address, Phone, Role } = temp;
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

async function deleteUser (temp){
    const {Email} = temp;
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

async function UpdateAccount (temp){
  const {accountid, Name, Email, Password, Address, Phone, Role } = temp;
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

// product
async function AddProduct(temp) {
  const { accountid } = temp;

  try {
    const accountQuery = `SELECT role FROM Account WHERE accountid = ${accountid}`;
    const accountResult = await db.query(accountQuery);

    if (accountResult.rowCount === 1 && accountResult.rows[0].role === 'FisherMan') {
      const { productname, productcost, accountid, posteddate, description, catchdate } = temp;
      const query = `INSERT INTO Product (productname, productcost, accountid, posteddate, description, catchdate) VALUES ('${productname}', '${productcost}', '${accountid}','${posteddate}', '${description}', '${catchdate}')`;

      const result = await db.query(query);

      if (result.rowCount === 1) {
        return {
          message: 'Product Added'
        };
      } else {
        return {
          message: 'Failed to add product'
        };
      }
    } else {
      return {
        message: 'Unauthorized. You must have the FisherMan role to add products.'
      };
    }
  } catch (error) {
    console.error(error);
    return {
      message: 'Internal Server Error'
    };
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

async function DeleteProduct(temp) {
  const { accountid, productid } = temp;

  try {
    const accountQuery = `SELECT role FROM Account WHERE accountid = ${accountid}`;
    const accountResult = await db.query(accountQuery);

    if (accountResult.rowCount === 1 && accountResult.rows[0].role === 'FisherMan') {
      const productQuery = `SELECT accountid FROM Product WHERE productid = '${productid}'`;
      const productResult = await db.query(productQuery);

      if (productResult.rowCount === 1 && productResult.rows[0].accountid === accountid) {
        const deleteQuery = `DELETE FROM product WHERE productid = '${productid}'`;
        const result = await db.query(deleteQuery);

        if (result.rowCount === 1) {
          return {
            message: 'Product Deleted'
          };
        } else {
          return {
            message: 'Failed to Delete product'
          };
        }
      } else {
        return {
          message: 'Unauthorized. You can only delete your own products.'
        };
      }
    } else {
      return {
        message: 'Unauthorized. You must have the FisherMan role to delete products.'
      };
    }
  } catch (error) {
    console.error(error);
    return {
      message: 'Internal Server Error'
    };
  }
}

async function UpdateProduct(temp) {
  const { productname, productcost, accountid, posteddate, description, catchdate, productid } = temp;

  try {
    const accountQuery = `SELECT role FROM Account WHERE accountid = ${accountid}`;
    const accountResult = await db.query(accountQuery);

    if (accountResult.rowCount === 1 && accountResult.rows[0].role === 'FisherMan') {
      const productQuery = `SELECT accountid FROM Product WHERE productid = '${productid}'`;
      const productResult = await db.query(productQuery);

      if (productResult.rowCount === 1 && productResult.rows[0].accountid === accountid) {
        const query = `UPDATE Product SET productname = '${productname}', productcost = '${productcost}' ,accountid = '${accountid}', posteddate = '${posteddate}',description = '${description}',catchdate = '${catchdate}' WHERE productid = '${productid}' `;
        const result = await db.query(query);

        if (result.rowCount === 1) {
          return {
            message: 'Product Updated'
          };
        } else {
          return {
            message: 'Failed to Update product'
          };
        }
      } else {
        return {
          message: 'Unauthorized. You can only Update your own products.'
        };
      }
    } else {
      return {
        message: 'Unauthorized. You must have the FisherMan role to delete products.'
      };
    }
  } catch (error) {
    console.error(error);
    return {
      message: 'Internal Server Error'
    };
  }
}

async function Order(temp) {
  const { accountid } = temp;

  try {
    const accountQuery = `SELECT role FROM Account WHERE accountid = ${accountid}`;
    const accountResult = await db.query(accountQuery);

    if (accountResult.rowCount === 1 && accountResult.rows[0].role === 'Traders') {
      const {accountid , productid , totalamount , orderdate , deliverydate , deliverystatus} = temp;
      const query = `INSERT INTO orders (accountid, productid, totalamount, orderdate, deliverydate, deliverystatus) VALUES 
                    ('${accountid}', '${productid}', '${totalamount}','${orderdate}', '${deliverydate}', '${deliverystatus}')`;
      const result = await db.query(query);
      if (result.rowCount === 1) {
        return {
          message: 'Order Added'
        };
      } else {
        return {
          message: 'Failed to Order product'
        };
      }
    } else {
      return {
        message: 'Unauthorized. You must have the Traders role to Order products.'
      };
    }
  } catch (error) {
    console.error(error)
    return {
      message: 'Internal Server Error'
    };
  }
}

async function UpdateOrder(temp) {
  const {orderid,accountid , productid , totalamount , orderdate , deliverydate , deliverystatus} = temp;

  try {
    const accountQuery = `SELECT role FROM Account WHERE accountid = ${accountid}`;
    const accountResult = await db.query(accountQuery);

    if (accountResult.rowCount === 1 && accountResult.rows[0].role === 'Traders') {
      const productQuery = `SELECT accountid FROM orders WHERE orderid = '${orderid}'`;
      const productResult = await db.query(productQuery);

      if (productResult.rowCount === 1 && productResult.rows[0].accountid === accountid) {
        const query = `UPDATE orders SET accountid = '${accountid}', productid = '${productid}' ,totalamount = '${totalamount}', orderdate = '${orderdate}',deliverydate = '${deliverydate}',deliverystatus = '${deliverystatus}' WHERE orderid = '${orderid}' `;
        const result = await db.query(query);

        if (result.rowCount === 1) {
          return {
            message: 'Order Updated'
          };
        } else {
          return {
            message: 'Failed to Update Order'
          };
        }
      } else {
        return {
          message: 'Unauthorized. You can only Order your own products.'
        };
      }
    } else {
      return {
        message: 'Unauthorized. You must have the Traders role to Update Order.'
      };
    }
  } catch (error) {
    console.error(error);
    return {
      message: 'Internal Server Error'
    };
  }
}

async function DeleteOrder(temp) {
  const {orderid,accountid} = temp;

  try {
    const accountQuery = `SELECT role FROM Account WHERE accountid = ${accountid}`;
    const accountResult = await db.query(accountQuery);

    if (accountResult.rowCount === 1 && accountResult.rows[0].role === 'Traders') {
      const productQuery = `SELECT accountid FROM orders WHERE orderid = '${orderid}'`;
      const productResult = await db.query(productQuery);

      if (productResult.rowCount === 1 && productResult.rows[0].accountid === accountid) {
        const query = `DELETE from orders where orderid = '${orderid}'`;
        const result = await db.query(query);

        if (result.rowCount === 1) {
          return {
            message: 'Order Deleted'
          };
        } else {
          return {
            message: 'Failed to Delete Order'
          };
        }
      } else {
        return {
          message: 'Unauthorized. You can only Delete your own orders.'
        };
      }
    } else {
      return {
        message: 'Unauthorized. You must have the Traders role to Delete products.'
      };
    }
  } catch (error) {
    console.error(error);
    return {
      message: 'Internal Server Error'
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
    ShowProduct,
    DeleteProduct,
    UpdateProduct,
    Order,
    UpdateOrder,
    DeleteOrder
};

