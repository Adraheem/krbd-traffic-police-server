const express = require("express");
const con = require("../../config/connection");
const { verifyAuthToken } = require("../../middlewares/verifyAuthToken");
const generateSlug = require("../../utils/generateSlug");
const validateAddCar = require("../../validation/add-car");
const router = express.Router();

router.post("/car/add", verifyAuthToken, (req, res) => {
  const { errors, isValid } = validateAddCar(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const name = req.body.name;
  const nationality = req.body.nationality;
  const dob = req.body.dob;
  const phone = req.body.phone;
  const address = req.body.address;
  const nin = req.body.nin;
  const passport = req.body.passport;
  const idcard = req.body.idcard;
  const model = req.body.model;
  const plate = req.body.plate;
  const color = req.body.color;
  const date_of_purchase = req.body.date_of_purchase;
  const spec = req.body.spec;
  const card = req.body.card;
  const exp = req.body.exp;
  const cvv = req.body.cvv;
  const bvn = req.body.bvn;
  const bank_name = req.body.bank_name;

  const slug = generateSlug();

  con.getConnection((err, connection) => {
    const query =
      "INSERT INTO car (slug, name, nationality, dob, phone, address, nin, passport, idcard, model, plate, color, date_of_purchase, spec, card, exp, cvv, bvn, bank_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const value = [
      slug,
      name,
      nationality,
      dob,
      phone,
      address,
      nin,
      passport,
      idcard,
      model,
      plate,
      color,
      date_of_purchase,
      spec,
      card,
      exp,
      cvv,
      bvn,
      bank_name,
    ];
    connection.query(query, value, (err, result) => {
      return res.status(200).json({ success: true, slug });
    });
    connection.release();
  });
});

module.exports = router;
