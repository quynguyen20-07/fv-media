import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { register } from "../redux/actions/authAction";

const Register = () => {
  const { auth, alert } = useSelector((state) => state);
  const history = useHistory();
  const dispatch = useDispatch();

  const initialState = {
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "male",
  };
  const [userData, setUserData] = useState(initialState);
  const { fullname, username, email, password, confirmPassword } = userData;

  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);

  useEffect(() => {
    if (auth.token) history.push("/");
  }, [auth.token, history]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(userData));
  };

  return (
    <div className="loginPage">
      <form onSubmit={handleSubmit}>
        <h3 className="logoName text-center mb-4">FOOD VIEW</h3>

        <div className="form-group">
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            className="form-control rounded-pill"
            id="fullname"
            onChange={handleChangeInput}
            value={fullname}
            name="fullname"
            style={{ background: `${alert.fullname ? "#E2C2B9" : ""}` }}
          />
          <small className="form-text text-danger">
            {alert.fullname ? alert.fullname : ""}
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            className="form-control rounded-pill"
            id="username"
            onChange={handleChangeInput}
            value={username.toLowerCase().replace(/ /g, "")}
            name="username"
            style={{ background: `${alert.username ? "#E2C2B9" : ""}` }}
          />
          <small className="form-text text-danger">
            {alert.username ? alert.username : ""}
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email Address</label>
          <input
            type="email"
            className="form-control rounded-pill"
            id="exampleInputEmail1"
            onChange={handleChangeInput}
            value={email}
            name="email"
            style={{ background: `${alert.email ? "#E2C2B9" : ""}` }}
          />
          <small className="form-text text-danger">
            {alert.email ? alert.email : ""}
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password: </label>
          <div className="pass">
            <input
              type={typePass ? "text" : "password"}
              className="form-control rounded-pill"
              id="exampleInputPassword1"
              onChange={handleChangeInput}
              value={password}
              name="password"
              style={{ background: `${alert.password ? "#E2C2B9" : ""}` }}
            />
            <small onClick={() => setTypePass(!typePass)}>
              {typePass ? "Hide" : "Show"}
            </small>
          </div>
          <small className="form-text text-danger">
            {alert.password ? alert.password : ""}
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password: </label>
          <div className="pass">
            <input
              type={typeCfPass ? "text" : "password"}
              className="form-control rounded-pill"
              id="confirmPassword"
              onChange={handleChangeInput}
              value={confirmPassword}
              name="confirmPassword"
              style={{
                background: `${alert.confirmPassword ? "#E2C2B9" : ""}`,
              }}
            />
            <small onClick={() => setTypeCfPass(!typeCfPass)}>
              {typeCfPass ? "Hide" : "Show"}
            </small>
          </div>
          <small className="form-text text-danger">
            {alert.confirmPassword ? alert.confirmPassword : ""}
          </small>
        </div>

        <div className="row justify-content-between mx-0 md-1">
          <label htmlFor="male">
            Male:
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              defaultChecked
              onChange={handleChangeInput}
            />
          </label>
          <label htmlFor="female">
            Female:
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              onChange={handleChangeInput}
            />
          </label>
          <label htmlFor="other">
            Other:
            <input
              type="radio"
              id="other"
              name="gender"
              value="other"
              onChange={handleChangeInput}
            />
          </label>
        </div>

        <div className="col text-center">
          <button type="submit" className="btn btn-dark rounded-pill w-100 mt-4">
            Register
          </button>
        </div>
        <p className="my-2">
          Already have an account ?{" "}
          <Link to="/" style={{ color: "tomato" }}>
            Login now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
