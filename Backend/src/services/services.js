const res = require('express/lib/response');
const db = require('../configs/DBconfig');
const helper = require('../utils/bcrypt.js');

//===========================================
//============ account ======================
//===========================================
async function loginFisherman(temp) {
  const { Email, Password } = temp;
  const query = `SELECT * FROM Account WHERE Email = '${Email}' AND Role = 'FisherMan'`;
  const result = await db.query(query);
  if (result.rowCount > 0) {
    const user = result.rows[0];
    const comparePass = await helper.comparePassword(Password, user.password);
    if (comparePass) {
      return { status: 200, message: 'Login successful', user };
    } else {
      return { status: 401, message: 'Password is not correct' };
    }
  } else {
    return { status: 404, message: 'Account not found' };
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
      return { status: 200, message: 'Login successful', user };
    } else {
      return { status: 401, message: 'Password is not correct' };
    }
  } else {
    return { status: 404, message: 'Account not found' };
  }
}


async function showUser(temp) {
  try {
    const { accountid } = temp;
    const query = `SELECT * FROM Account WHERE accountid = '${accountid}'`;
    const result = await db.query(query);

    if (result.rowCount > 0) {
      return {
        status: 200,
        message: 'Account found',
        account: result.rows[0],
      };
    } else {
      return {
        status: 200, // or 204 (No Content) depending on your preference
        message: 'Account not found',
      };
    }
  } catch (error) {
    console.error('Error fetching account information:', error);
    throw error; // Re-throw the error to ensure it gets logged
  }
}

async function register(temp) {
  const { Name, Email, Password, Address, Phone, Role } = temp;
  const pass = await helper.hashPassword(Password);
  const query = `INSERT INTO Account (Name, Email, Password, Address, Phone, Role) VALUES ('${Name}', '${Email}', '${pass}', '${Address}', '${Phone}', '${Role}')`;
  const result = await db.query(query);
  if (result.rowCount === 1) {
    return {
      status: 200, message: 'Register successful'
    }
  } else {7
    return {
      status: 404, message: 'Register Failed'
    }
  }
}

async function deleteUser(temp) {
  const { Email } = temp;
  const query = `DELETE FROM Account WHERE Email = '${Email}'`;
  const result = await db.query(query);
  if (result.rowCount === 1) {
    return {
      message: 'Account deleted'
    }
  }
  else {
    return {
      message: 'Account not found'
    }
  }
}

async function UpdateAccount(temp) {
  const { accountid, Name, Email, Password, Address, Phone, Role } = temp;
  const pass = await helper.hashPassword(Password);
  const query = `UPDATE Account SET accountid = '${accountid}', Name = '${Name}' , Email = '${Email}',Password = '${pass}',Address = '${Address}',Phone = '${Phone}',Role = '${Role}' WHERE accountid = '${accountid}' `;
  const result = await db.query(query);
  if (result.rowCount === 1) {
    return {
      status:200, message: 'Update account successful'
    }
  } else {
    return {
      status:404, message: 'Error'
    }
  }
}

//===========================================
//============ Product ======================
//===========================================
async function AddProduct(temp) {
  const { accountid } = temp;

  try {
    const accountQuery = `SELECT role FROM Account WHERE accountid = ${accountid}`;
    const accountResult = await db.query(accountQuery);

    if (accountResult.rowCount === 1 && accountResult.rows[0].role === 'FisherMan') {
      const { productname, productcost, accountid, posteddate, description, catchdate, productimg } = temp;
      const query = `INSERT INTO Product (productname, productcost, accountid, posteddate, description, catchdate,productimg) VALUES ('${productname}', '${productcost}', '${accountid}','${posteddate}', '${description}', '${catchdate}','${productimg}')`;

      const result = await db.query(query);

      if (result.rowCount === 1) {
        return {
          status: 200, message: 'Product Added'
        };
      } else {
        return {
          status: 404, message: 'Failed to add product'
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


async function ShowProduct(temp) {
  const { accountid } = temp;
  const query = `SELECT * FROM Product WHERE accountid = '${accountid}'`;
  const result = await db.query(query);

  if (result.rowCount > 0) {
    return {
      status: 200,
      message: 'Product found',
      accounts: result.rows,
    };
  } else {
    return {
      message: 'No Product Added',
    };
  }
}

async function AllShowProduct() {
  const query = `SELECT * FROM Product`;
  const result = await db.query(query);

  if (result.rowCount > 0) {
    return {
      status: 200,
      message: 'Product found',
      accounts: result.rows,
    };
  } else {
    return {
      message: 'No Product Added',
    };
  }
}

async function ShowProductID(temp) {
  const { productid } = temp;
  const query = `SELECT * FROM Product WHERE productid = '${productid}'`;
  const result = await db.query(query);

  if (result.rowCount > 0) {
    return {
      status: 200,
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
  const { productname, productcost, accountid, posteddate, description, catchdate, productid, productimg } = temp;

  try {
    const accountQuery = `SELECT role FROM Account WHERE accountid = ${accountid}`;
    const accountResult = await db.query(accountQuery);

    if (accountResult.rowCount === 1 && accountResult.rows[0].role === 'FisherMan') {
      const productQuery = `SELECT accountid FROM Product WHERE productid = '${productid}'`;
      const productResult = await db.query(productQuery);

      if (productResult.rowCount === 1 && productResult.rows[0].accountid === accountid) {
        const query = `UPDATE Product SET productname = '${productname}', productcost = '${productcost}' ,accountid = '${accountid}', posteddate = '${posteddate}',description = '${description}',catchdate = '${catchdate}' ,productimg = '${productimg}' WHERE productid = '${productid}' `;
        const result = await db.query(query);

        if (result.rowCount === 1) {
          return {
            status: 200, message: 'Product Updated'
          };
        } else {
          return {
            status: 404, message: 'Failed to Update product'
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

//===========================================
//============ Order=========================
//===========================================
async function Order(temp) {
  const { accountid } = temp;

  try {
    const accountQuery = `SELECT role FROM Account WHERE accountid = ${accountid}`;
    const accountResult = await db.query(accountQuery);

    if (accountResult.rowCount === 1) {
      const { accountid, productid, totalamount} = temp;
      const query = `INSERT INTO orders (accountid, productid, totalamount) VALUES ('${accountid}', '${productid}', '${totalamount}')`;
      const result = await db.query(query);
      if (result.rowCount === 1) {
        return {
         status:200, message: 'Order Added'
        };
      } else {
        return {
          status:404,message: 'Failed to Order product'
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
  const { orderid, accountid, productid, totalamount, orderdate, deliverydate, deliverystatus } = temp;

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
  const { orderid, accountid } = temp;

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


//=================================================
//============ Shopping Cart ======================
//=================================================
async function AddCart(temp) {
  const { accountid } = temp;

  try {
    const accountQuery = `SELECT role FROM Account WHERE accountid = ${accountid}`;
    const accountResult = await db.query(accountQuery);

    if (accountResult.rowCount === 1) {
      const { accountid, productid, productname, totalamount } = temp;

      // Fetch the ProductCost from the Product table
      const productQuery = `SELECT ProductCost FROM Product WHERE ProductID = ${productid}`;
      const productResult = await db.query(productQuery);

      if (productResult.rowCount === 1) {
        const productCost = productResult.rows[0].productcost;

        // Calculate the Total based on TotalAmount and ProductCost
        const total = totalamount * productCost;

        const query = `
          INSERT INTO Shopping_Cart (accountid, productid, productname, totalamount, total)
          VALUES ('${accountid}', '${productid}', '${productname}', '${totalamount}', '${total}')
        `;

        const result = await db.query(query);

        if (result.rowCount === 1) {
          return {
            status: 200,
            message: 'Product Added to Cart'
          };
        } else {
          return {
            message: 'Failed to Add Cart'
          };
        }
      } else {
        return {
          message: 'Product not found'
        };
      }
    } else {
      return {
        message: 'Unauthorized. You must have the Traders role to add products.'
      };
    }
  } catch (error) {
    console.error(error);
    return {
      message: 'Internal Server Error'
    };
  }
}


async function ShowCart(temp) {

  const { accountid } = temp;
  const query = `SELECT * FROM Shopping_Cart WHERE accountid = ${accountid}`;
  const result = await db.query(query);

  if (result.rowCount > 0) {
    return {
      message: 'Product found',
      accounts: result.rows,
    };
  } else {
    return {
      message: 'No Product Added to Cart',
    };
  }
}

async function DeleteCart(temp) {
  const { accountid, productid } = temp;

  try {
    const accountQuery = `SELECT role FROM Account WHERE accountid = ${accountid}`;
    const accountResult = await db.query(accountQuery);

    if (accountResult.rowCount === 1 && accountResult.rows[0].role === 'Traders') {
      const productQuery = `SELECT accountid FROM Shopping_Cart WHERE productid = '${productid}'`;
      const productResult = await db.query(productQuery);

      if (productResult.rowCount === 1 && productResult.rows[0].accountid === accountid) {
        const deleteQuery = `DELETE FROM Shopping_Cart WHERE productid = '${productid}'`;
        const result = await db.query(deleteQuery);

        if (result.rowCount === 1) {
          return {
            message: 'Cart Deleted'
          };
        } else {
          return {
            message: 'Failed to Delete Product from Cart'
          };
        }
      } else {
        return {
          message: 'Unauthorized. You can only delete your own Cart.'
        };
      }
    } else {
      return {
        message: 'Unauthorized. You must have the Traders role to delete products.'
      };
    }
  } catch (error) {
    console.error(error);
    return {
      message: 'Internal Server Error'
    };
  }
}

async function UpdateCart(temp) {
  const { accountid, Created, productid } = temp;

  try {
    const accountQuery = `SELECT role FROM Account WHERE accountid = ${accountid}`;
    const accountResult = await db.query(accountQuery);

    if (accountResult.rowCount === 1 && accountResult.rows[0].role === 'Traders') {
      const productQuery = `SELECT accountid FROM Shopping_Cart WHERE productid = '${productid}'`;
      const productResult = await db.query(productQuery);

      if (productResult.rowCount === 1 && productResult.rows[0].accountid === accountid) {
        const query = `UPDATE Shopping_Cart SET accountid = '${accountid}', Created = '${Created}', productid = '${productid}' `;
        const result = await db.query(query);

        if (result.rowCount === 1) {
          return {
            message: 'Cart Updated'
          };
        } else {
          return {
            message: 'Failed to Update Cart'
          };
        }
      } else {
        return {
          message: 'Unauthorized. You can only Update your own cart.'
        };
      }
    } else {
      return {
        message: 'Unauthorized. You must have the Traders role to delete products.'
      };
    }
  } catch (error) {
    console.error(error);
    return {
      message: 'Internal Server Error'
    };
  }
}

//===========================================
//============ Review =======================
//===========================================
async function AddReview(temp) {
  const { accountid } = temp;

  try {
    const accountQuery = `SELECT role FROM Account WHERE accountid = ${accountid}`;
    const accountResult = await db.query(accountQuery);

    if (accountResult.rowCount === 1 && accountResult.rows[0].role === 'Traders') {
      const { accountid, productid, reviewcontent, rating } = temp;
      const query = `INSERT INTO Reviews (accountid, productid, reviewcontent, rating) VALUES ('${accountid}', '${productid}', '${reviewcontent}','${rating}')`;

      const result = await db.query(query);

      if (result.rowCount === 1) {
        return {
          status:200,message: 'Review Added'
        };
      } else {
        return {
          message: 'Failed to add Review'
        };
      }
    } else {
      return {
        message: 'Unauthorized. You must have the Traders role to add Reviews.'
      };
    }
  } catch (error) {
    console.error(error);
    return {
      message: 'Internal Server Error'
    };
  }
}

async function ShowReview(temp) {
  const {productid} = temp;
  const query = `SELECT * FROM Reviews WHERE productid = '${productid}'`;
  const result = await db.query(query);

  if (result.rowCount > 0) {
    return {
      status:200,
      message: 'Review found',
      accounts: result.rows,
    };
  } else {
    return {
      status:404,
      message: 'No Review Added',
    };
  }
}

async function UpdateReview(temp) {
  const { accountid, productid, reviewcontent, rating, reviewid } = temp;

  try {
    const accountQuery = `SELECT role FROM Account WHERE accountid = ${accountid}`;
    const accountResult = await db.query(accountQuery);

    if (accountResult.rowCount === 1 && accountResult.rows[0].role === 'Traders') {
      const productQuery = `SELECT accountid FROM Reviews WHERE reviewid = '${reviewid}'`;
      const productResult = await db.query(productQuery);

      if (productResult.rowCount === 1 && productResult.rows[0].accountid === accountid) {
        const query = `UPDATE Reviews SET accountid = '${accountid}', productid = '${productid}', reviewcontent = '${reviewcontent}',rating = '${rating}' WHERE reviewid = '${reviewid}' `;
        const result = await db.query(query);

        if (result.rowCount === 1) {
          return {
            message: 'Review Updated'
          };
        } else {
          return {
            message: 'Failed to Update Review'
          };
        }
      } else {
        return {
          message: 'Unauthorized. You can only update your own Review.'
        };
      }
    } else {
      return {
        message: 'Unauthorized. You must have the Traders role to delete Reviews.'
      };
    }
  } catch (error) {
    console.error(error);
    return {
      message: 'Internal Server Error'
    };
  }
}

async function DeleteReview(temp) {
  const { accountid, reviewid } = temp;

  try {
    const accountQuery = `SELECT role FROM Account WHERE accountid = ${accountid}`;
    const accountResult = await db.query(accountQuery);

    if (accountResult.rowCount === 1 && accountResult.rows[0].role === 'Traders') {
      const productQuery = `SELECT accountid FROM Reviews WHERE reviewid = '${reviewid}'`;
      const productResult = await db.query(productQuery);

      if (productResult.rowCount === 1 && productResult.rows[0].accountid === accountid) {
        const deleteQuery = `DELETE FROM Reviews WHERE reviewid = '${reviewid}'`;
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
          message: 'Unauthorized. You can only delete your own Review.'
        };
      }
    } else {
      return {
        message: 'Unauthorized. You must have the Traders role to delete Review.'
      };
    }
  } catch (error) {
    console.error(error);
    return {
      message: 'Internal Server Error'
    };
  }
}

//===========================================
//============ Payment ======================
//===========================================
// async function payment(temp) {
//   const { accountid } = temp;
//   console.log(temp);

//   try {
//     const accountQuery = `SELECT role FROM Account WHERE accountid = ${accountid}`;
//     const accountResult = await db.query(accountQuery);

//     if (accountResult.rowCount === 1 && accountResult.rows[0].role === 'Traders') {
//       const { accountid,orderid, details } = temp;

//       const query = `
//       INSERT INTO payment (accountid, orderid, total, details)
//       SELECT
//         '${accountid}',
//         '${orderid}',
//         (SELECT totalamount FROM Orders WHERE OrderID = '${orderid}') *
//         (SELECT productcost FROM Product WHERE ProductID = (SELECT ProductID FROM Orders WHERE OrderID = '${orderid}')),
//         '${details}';
//     `;

//       console.log('Query:', query);

//       const result = await db.query(query);
//       if (result.rowCount === 1) {
//         return {
//           status:200,message: 'Payment Added'
//         };
//       } else {
//         return {
//           status:404,message: 'Failed to Pay product'
//         };
//       }
//     } else {
//       return {
//         message: 'Unauthorized. You must have the Traders role to Order Payment.'
//       };
//     }
//   } catch (error) {
//     console.error(error)
//     return {
//       message: 'Internal Server Error'
//     };
//   }
// }

async function payment(temp) {
  const { accountid } = temp;

  try {
    const accountQuery = `SELECT role FROM Account WHERE accountid = ${accountid}`;
    const accountResult = await db.query(accountQuery);

    if (accountResult.rowCount === 1 && accountResult.rows[0].role === 'Traders') {
      const { accountid, shoppingcartid, details } = temp;

      const query = `
        INSERT INTO payment (accountid, shoppingcartid, details)
        VALUES ('${accountid}', '${shoppingcartid}', '${details}');
      `;

      console.log('Query:', query);

      const result = await db.query(query);
      if (result.rowCount === 1) {
        return {
          status: 200,
          message: 'Payment Added'
        };
      } else {
        return {
          status: 404,
          message: 'Failed to Pay product'
        };
      }
    } else {
      return {
        message: 'Unauthorized. You must have the Traders role to Order Payment.'
      };
    }
  } catch (error) {
    console.error(error)
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
  DeleteOrder,
  AddCart,
  ShowCart,
  DeleteCart,
  UpdateCart,
  AddReview,
  ShowReview,
  UpdateReview,
  DeleteReview,
  payment,
  ShowProductID,
  AllShowProduct
};

