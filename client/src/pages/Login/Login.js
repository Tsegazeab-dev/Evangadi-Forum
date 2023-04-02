import axios from "axios";
import "./Login.css";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Footer from "../Footer/Footer";

import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton } from "@mui/material";

function Login() {
  const [userData, setUserData] = useContext(UserContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [type, setType] = useState("password");
  const [visibility, setVisibilitiy] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //sending user data to database to be logged in
      const loginRes = await axios.post(
        "http://localhost:4000/api/users/login",
        {
          email: form.email,
          password: form.password,
        }
      );

      //update global state with response from backend(user-info)
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });

      //set localStorage with the token
      localStorage.setItem("auth-token", loginRes.data.token);

      //navigate user to homepage
      navigate("/");
    } catch (err) {
      // if the email isnot reegistered in the database the backend respond 404 with message so to show that message to the frontend we use the path err.response.data.msg
      console.log("problem", err.response.data.msg);
      alert(err.response.data.msg);
    }
  };

  const handleToogle = () => {
    if (type === "password") {
      setVisibilitiy(true);
      setType("text");
    } else {
      setVisibilitiy(false);
      setType("password");
    }
  };

  // useEffect(() => {
  //   if (userData.user) navigate("/");
  // }, [userData.user, navigate]);

  return (
    <div>
    <div className="login d-lg-flex d-sm-block">
      <div className="login__container">
        <div className="login__title ">
          <h2>Login to your account</h2>
          <p>
            Don't have an account?{" "}
            <Link className="account__link" to="/signup">
              Create a new account
            </Link>
          </p>

          <form className="login__form" onSubmit={handleSubmit}>
            {/* <label>Email</label> */}
            <input
              type="email"
              name="email"
              placeholder="Email address"
              onChange={handleChange}
            />{" "}
            <br />
            {/* <label>Password</label> */}
            <div>
                <input
                  type={type}
                  name="password"
                  onChange={handleChange}
                  placeholder="Password"
                />
                <span className="eye mt-3">
                  <IconButton onClick={handleToogle}>
                    {visibility ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </span>
              </div>
            <br />
            <button className="login__button">Login</button>
          </form>
          <Link className="account__link" to="/signup">
            Create an Account?
          </Link>
        </div>
      </div>

        <div className="login__about">
          <p id="about">About</p>
          <h1>Evangadi Networks</h1>
          <p>
          No matter what stage of life you are in, whether you’re just starting elementary school or being promoted to CEO of a Fortune 500 company, you have much to offer to those who are trying to follow in your footsteps.
          </p>
          <p>
          Wheather you are willing to share your knowledge or you are just looking to meet mentors of your own, please start by joining the network here.
          </p>{" "}
          <button>HOW IT WORKS</button>
        </div>
            </div>
            <Footer/>
        </div>
  );
}

export default Login;
