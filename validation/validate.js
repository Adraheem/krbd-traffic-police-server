const Validator = require("validator");
const isEmpty = require("is-empty");

const validateAddOffence = (data) => {
  let errors = {};

  data.car = !isEmpty(data.car) ? data.car : "";

  if (Validator.isEmpty(data.car)) {
    errors.car = "Car cannot be empty";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = { validateAddOffence };
