const db = require('../Config/dbconfig.js');
const helper = require('../Utils/Helper.js');

//Check Semua account yang ada
function checkAllAccounts(callback) {
  const query = `SELECT * FROM Account`;
  db.query(query, (err, accountResults) => {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      callback(null, accountResults.rows);
    }
  });
}

//Login Account fisherMan
function loginFisherman(mm, callback) {
  const { Email, Password } = mm;
  const query = `SELECT * FROM Account WHERE Email = '${Email}' AND Password = '${Password}' AND Role = 'FisherMan'`;
  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
      callback(err, null);
    } else {
      if (result.rows.length === 1) {
        const fishermanAccount = result.rows[0];
        callback(null, fishermanAccount);
      } else {
        callback(null, null);
      }
    }
  });
}

//Login Account Traders
function loginTraders(mm, callback) {
  const { Email, Password } = mm;
  const query = `SELECT * FROM Account WHERE Email = '${Email}' AND Password = '${Password}' AND Role = 'Traders'`;
  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
      callback(err, null);
    } else {
      if (result.rows.length === 1) {
        const tradersAccount = result.rows[0];
        callback(null, tradersAccount);
      } else {
        callback(null, null);
      }
    }
  });
}

//Register
//Delete
//Edit


module.exports = {
  checkAllAccounts,
  loginFisherman,
  loginTraders
};