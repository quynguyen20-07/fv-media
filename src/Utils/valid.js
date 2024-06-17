const valid = ({ fullname, username, email, password, confirmPassword }) => {
  const error = {};

  if (!fullname) {
    error.fullname = "Please enter your full name!!!!";
  } else if (fullname.length > 20) {
    error.fullname =
      "Full name is too long, please enter less than 20 characters";
  }
  if (!username) {
    error.username = "Please enter your user name!!!!";
  } else if (username.replace(/ /g, "").length > 20) {
    error.username =
      "User name is too long, please enter less than 20 characters";
  }

  if (!email) {
    error.email = "Please enter your email!!!!";
  } else if (!validateEmail(email)) {
    error.email = "Email format is wrong!!!!";
  }
  if (!password) {
    error.password = "Please enter your password!!!!";
  } else if (password.length < 6) {
    error.password = "Password must be at least 6 charter!!!!";
  }
  if (password !== confirmPassword) {
    error.confirmPassword = "Confirm password dit not match";
  }
  return {
    errorMsg: error,
    errorLength: Object.keys(error).length,
  };
};
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export default valid;
