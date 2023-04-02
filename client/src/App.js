import { useContext, useEffect } from "react";
import "./App.css";
import { UserContext } from "./context/UserContext";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Question from "./pages/Ask/Question";
import Answer from "./pages/Answer/Answer";
import Header from "./pages/Header/Header";
import Footer from "./pages/Footer/Footer";

function App() {
  const [userData, setUserData] = useContext(UserContext);

  const checkLoggedIn = async () => {
    //check if token already exists in localStorage
    let token = localStorage.getItem("auth-token");
    if (token === null) {
      //token not in localStorage then set auth token empty
      localStorage.setItem("auth-token", "");
      token = "";
    } else {
      //if token exists in localStorage then send request to auth to verify token and get user info
      const userRes = await axios.get("http://localhost:4000/api/users", {
        headers: { "x-auth-token": token },
      });

      //set the global state with user info
      // the first .data is to access axios response and the other the user info responded from backend use data as a key
      setUserData({
        token,
        user: {
          id: userRes.data.data.user_id,
          display_name: userRes.data.data.user_name,
        },
      });
    }
  };

  const logout = () => {
    //set global state to undefined will logout the user
    setUserData({
      token: undefined,
      user: undefined,
    });

    //resetting localStorage
    localStorage.setItem("auth-token", "");
  };

  useEffect(() => {
    //check if the user is logged in
    checkLoggedIn();
  }, []);

  return (
    <Router>
      <div>

        <Routes>
          <Route
            path="/login"
            element={
              <div>
                <Header />
              <div className="bg"> 
                  <Login />
              </div>
              </div>
            }
          />
          <Route path="/signup" element={ 
          <div>
          <Header />
        <div className="bg"> 
                <SignUp />
        </div>
        </div>} 
              />
          <Route
            path="/question"
            element={
              <div>
                <Header logout={logout}/>
                <Question />
              </div>
                  
            }
          />
          <Route
            path="/answer"
            element={
              <div>
                <Header logout={logout}/>
                <Answer />
              </div>
            }
          />
          {/* <Route path="/question:id" element={<Answer postId = {id} />} /> */}

          {/* passing logout function as props to Home page */}
          <Route
            path="/"
            element={
              <div>
                <Header logout={logout}/>
                <Home />
              </div>
              
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
