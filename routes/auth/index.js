const express = require("express");
const con = require("../../config/connection");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const validateLoginInput = require("../../validation/login");

// Login
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // find user by email
  con.getConnection((err, connection) => {
    if (err) throw err;

    const searchQuery =
      "SELECT id, email, name, password FROM admin WHERE email = ?";
    connection.query(searchQuery, [email], (err, result) => {
      if (err) throw err;

      if (result.length === 1) {
        // check password
        bcrypt.compare(password, result[0].password).then((isMatch) => {
          if (isMatch) {
            // user matched
            // create JWT payload
            const payload = {
              id: result[0].id,
              email: result[0].email,
              name: result[0].name,
            };

            // sign token
            jwt.sign(
              payload,
              process.env.secretOrKey,
              { expiresIn: 94608000 },
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token,
                });
              }
            );
          } else {
            // no match
            return res.status(400).json({ password: "Incorrect Password" });
          }
        });
      } else {
        return res.status(400).json({ email: "Email not registered" });
      }
    });
    connection.release();
  });
});

module.exports = router;
