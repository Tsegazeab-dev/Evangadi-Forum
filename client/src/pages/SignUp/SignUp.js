import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import"./SignUp.css"
import Footer from '../Footer/Footer';

import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton } from "@mui/material";

function SignUp() {
    const [form, setForm] = useState({});
    const [type, setType] = useState("password");
  const [visibility, setVisibilitiy] = useState(false);
    const navigate = useNavigate();  
    const [userData, setUserData] = useContext(UserContext);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //sending data to be registered in database
            await axios.post('http://localhost:4000/api/users', form);

            //once registered the login automatically so send the new user info to be logged in
            const loginRes = await axios.post('http://localhost:4000/api/users/login', {
                email: form.email,
                password: form.password
            });

            // set the global state with the new user info
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user
            });

            //set localStorage with the token
            localStorage.setItem('auth-token', loginRes.data.token);

            //navigate to homepage once the user is signed up
            navigate("/");
        } catch (error) {
            console.log('problem ==>', error.response.data.msg);
alert(error.response.data.msg)

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
  return (
    <div>
    <div className='signup d-lg-flex d-sm-block'>
    <div className='signup__container'>
      <div className='signup__title'>
        <h2>Join the network</h2>
        <p>Already have an account? <Link className='account__link'  to="/login">Sign in</Link></p>
        
        <form  className='signup__form' onSubmit={handleSubmit}>
            <input type="email" name ="email" placeholder='Email' onChange={handleChange}/> <br />

          <div className='signup__FLname'>
            <input type="text" name ="firstName" placeholder='First Name' onChange={handleChange}/> <br /> 

            <input id='lastname' type="text" name='lastName'  placeholder='Last Name'onChange={handleChange}/><br />
            </div>

            <input type="text" name='userName'  placeholder='User Name'onChange={handleChange}/><br />

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
              </div><br />
            <button className='signup__button'>Agree and Join</button>
        </form>
        <p>I agree to the <a href="">privacy policy</a> and <a href="">terms of service</a></p>
        <Link className='account__link' to = "/login">Already have an ccount?</Link>
        </div>

    </div>
 
    <div className="signup__about">
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
  )
}

export default SignUp