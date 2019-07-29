const Validator = require("validator");

module.exports = function validateSignUpValue(data) {
  let errors = {};
  let isValid = true;

  if (Validator.isEmpty(data.name)) {
    errors.name = "User name is required!";
    isValid = false;
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required!";
    isValid = false;
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email address is invalid!";
    isValid = false;
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is requried!";
    isValid = false;
  }

  return {
    errors,
    isValid
  };
};
