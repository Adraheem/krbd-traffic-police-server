const con = require("../config/connection");
const randomString = require("./randomString");

function checkSlug(slug) {
  con.getConnection((err, connection) => {
    if (err) throw err;

    connection.query(
      "SELECT id FROM car WHERE slug = ?",
      [slug],
      (err, result) => {
        if (result.length > 0) {
          return true;
        } else {
          return false;
        }
      }
    );
    connection.release();
  });
}

module.exports = function generateSlug() {
  let u = randomString(8);
  while (checkSlug(u)) {
    u = randomString(8);
  }

  return u;
};
