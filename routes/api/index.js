const express = require("express");
const con = require("../../config/connection");
const { verifyAuthToken } = require("../../middlewares/verifyAuthToken");
const generateSlug = require("../../utils/generateSlug");
const validateAddCar = require("../../validation/add-car");
const { validateAddOffence } = require("../../validation/validate");
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

router.post("/car", verifyAuthToken, (req, res) => {
  con.getConnection((err, connection) => {
    connection.query(
      "SELECT name, slug, plate, model FROM car WHERE slug = ? ",
      [req.body.car],
      (err, result) => {
        return res.status(200).json(result[0]);
      }
    );

    connection.release();
  });
});

router.post("/cars", verifyAuthToken, (req, res) => {
  con.getConnection((err, connection) => {
    connection.query(
      "SELECT slug AS plate, model, (SELECT SUM(amount) FROM offence WHERE car = car.slug AND status != 'removed' GROUP BY car) AS fine, (SELECT dateAdded FROM offence WHERE car = car.slug ORDER BY id DESC LIMIT 1) AS time FROM car ORDER BY time",
      (err, result) => {
        return res.status(200).json(result);
      }
    );
    connection.release();
  });
});

router.post("/car/search", verifyAuthToken, (req, res) => {
  con.getConnection((err, connection) => {
    connection.query(
      "SELECT slug AS plate, model, (SELECT SUM(amount) FROM offence WHERE car = car.slug AND status != 'removed' GROUP BY car) AS fine, (SELECT dateAdded FROM offence WHERE car = car.slug ORDER BY id DESC LIMIT 1) AS time FROM car WHERE slug LIKE '%?%' OR model LIKE '%?%' OR name LIKE '%?%' OR plate LIKE '%?%' ORDER BY time",
      [req.body.query, req.body.query, req.body.query, req.body.query],
      (err, result) => {
        return res.status(200).json(result);
      }
    );
    connection.release();
  });
});

router.post("/offence/add", verifyAuthToken, (req, res) => {
  const { errors, isValid } = validateAddOffence(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  con.getConnection((err, connection) => {
    const car = req.body.car;
    const reason = req.body.reason;
    const amount = req.body.amount;
    const location = req.body.location;

    connection.query(
      "INSERT INTO offence (`car`, `status`, `reason`, `amount`, `location`, `dateAdded`) VALUES (?, 'pending', ?, ?, ?, now())",
      [car, reason, amount, location],
      (err, result) => {
        return res.status(200).json({ success: true });
      }
    );

    connection.release();
  });
});

router.post("/offence/recent", verifyAuthToken, (req, res) => {
  con.getConnection((err, connection) => {
    connection.query(
      "SELECT id, car AS plate, status, reason, amount AS fine, location AS place, dateAdded AS time FROM offence WHERE car = ? ORDER BY id DESC",
      [req.body.car],
      (err, result) => {
        return res.status(200).json(result);
      }
    );

    connection.release();
  });
});

router.post("/history/search", verifyAuthToken, (req, res) => {
  con.getConnection((err, connection) => {
    connection.query(
      "SELECT id, car AS plate, status, reason, amount AS fine, location AS place, dateAdded AS time FROM offence WHERE car LIKE '%?%' OR reason LIKE '%?%' OR amount LIKE '%?%' OR location LIKE '%?%' ORDER BY id DESC",
      [req.body.query, req.body.query, req.body.query, req.body.query],
      (err, result) => {
        return res.status(200).json(result);
      }
    );

    connection.release();
  });
});

router.post("/offences", verifyAuthToken, (req, res) => {
  con.getConnection((err, connection) => {
    connection.query(
      "SELECT id, car AS plate, status, reason, amount AS fine, location AS place, dateAdded AS time FROM offence ORDER BY id DESC",
      [req.body.car],
      (err, result) => {
        return res.status(200).json(result);
      }
    );

    connection.release();
  });
});

router.post("/appeals", verifyAuthToken, (req, res) => {
  con.getConnection((err, connection) => {
    connection.query(
      "SELECT appeal.id, appeal.car AS plate, appeal.reason AS content, appeal.status, appeal.dateAdded AS time, offence.reason FROM appeal LEFT JOIN offence ON offence.id = appeal.offence ORDER BY appeal.id DESC",
      (err, result) => {
        return res.status(200).json(result);
      }
    );

    connection.release();
  });
});

router.post("/appeal/add", (req, res) => {
  con.getConnection((err, connection) => {
    connection.query(
      "INSERT INTO appeal (car, offence, reason, status, dateAdded) VALUES (?, ?, ?, 'pending', now())",
      [req.body.car, req.body.offence, req.body.reason],
      (err, result) => {
        return res.status(200).json({ success: true });
      }
    );

    connection.release();
  });
});

module.exports = router;
