import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { login } from "../redux/actions/authAction";
import { useSelector, useDispatch } from "react-redux";

const Login = () => {
  const initialState = { email: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const [typePass, setTypePass] = useState(false);

  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (auth.token) history.push("/");
  }, [auth.token, history]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData));
  };

  return (
    <div className="loginPage">
      <form onSubmit={handleSubmit}>
        <h3 className="logoName text-center mb-4">FOOD VIEW</h3>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control "
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={handleChangeInput}
            value={email}
            name="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password: </label>
          <div className="pass">
            <input
              type={typePass ? "text" : "password"}
              className="form-control "
              id="exampleInputPassword1"
              onChange={handleChangeInput}
              value={password}
              name="password"
            />
            <small onClick={() => setTypePass(!typePass)}>
              {typePass ? "Hide" : "Show"}
            </small>
          </div>
        </div>
        <div className=" text-center">
          <button
            type="submit"
            className="btn btn-dark  loginBtn mt-4"
            disabled={email && password ? false : true}
          >
            Login
          </button>
        </div>
        <p className="my-2">
          You don't have an account ?{" "}
          <Link to="/register" style={{ color: "tomato" }}>
            Register an account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
