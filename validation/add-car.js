const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateAddCar(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.nationality = !isEmpty(data.nationality) ? data.nationality : "";
  data.dob = !isEmpty(data.dob) ? data.dob : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.nin = !isEmpty(data.nin) ? data.nin : "";
  data.passport = !isEmpty(data.passport) ? data.passport : "";
  data.idcard = !isEmpty(data.idcard) ? data.idcard : "";
  data.model = !isEmpty(data.model) ? data.model : "";
  data.plate = !isEmpty(data.plate) ? data.plate : "";
  data.color = !isEmpty(data.color) ? data.color : "";
  data.date_of_purchase = !isEmpty(data.date_of_purchase)
    ? data.date_of_purchase
    : "";
  data.spec = !isEmpty(data.spec) ? data.spec : "";
  data.card = !isEmpty(data.card) ? data.card : "";
  data.exp = !isEmpty(data.exp) ? data.exp : "";
  data.cvv = !isEmpty(data.cvv) ? data.cvv : "";
  data.bvn = !isEmpty(data.bvn) ? data.bvn : "";
  data.bank_name = !isEmpty(data.bank_name) ? data.bank_name : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name cannot be empty";
  }
  if (Validator.isEmpty(data.nationality)) {
    errors.nationality = "Nationality cannot be empty";
  }
  if (Validator.isEmpty(data.dob)) {
    errors.dob = "Date of Birth cannot be empty";
  }
  if (Validator.isEmpty(data.phone)) {
    errors.phone = "Phone Number cannot be empty";
  }
  if (Validator.isEmpty(data.address)) {
    errors.address = "Address cannot be empty";
  }
  if (Validator.isEmpty(data.nin)) {
    errors.nin = "NIN cannot be empty";
  }
  if (Validator.isEmpty(data.passport)) {
    errors.passport = "Passport cannot be empty";
  }
  if (Validator.isEmpty(data.idcard)) {
    errors.idcard = "ID card cannot be empty";
  }
  if (Validator.isEmpty(data.model)) {
    errors.model = "Model cannot be empty";
  }
  if (Validator.isEmpty(data.plate)) {
    errors.plate = "Plate number cannot be empty";
  }
  if (Validator.isEmpty(data.color)) {
    errors.color = "Color cannot be empty";
  }
  if (Validator.isEmpty(data.date_of_purchase)) {
    errors.date_of_purchase = "Date of purchase cannot be empty";
  }
  if (Validator.isEmpty(data.spec)) {
    errors.spec = "Spec cannot be empty";
  }
  if (Validator.isEmpty(data.card)) {
    errors.card = "Card cannot be empty";
  }
  if (Validator.isEmpty(data.exp)) {
    errors.exp = "Expiry date cannot be empty";
  }
  if (Validator.isEmpty(data.cvv)) {
    errors.cvv = "CVV cannot be empty";
  }
  if (Validator.isEmpty(data.bvn)) {
    errors.bvn = "BVN cannot be empty";
  }
  if (Validator.isEmpty(data.bank_name)) {
    errors.bank_name = "Bank name cannot be empty";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
