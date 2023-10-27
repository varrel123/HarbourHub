const db = require('../Config/dbconfig.js');

//Check Semua account yang ada
function checkAllAccounts(callback) {
  db.query('SELECT * FROM Account', (err, accountResults) => {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      callback(null, accountResults.rows);
    }
  });
}

//Login
//Register
//Delete
//Edit


module.exports = {
  checkAllAccounts
};