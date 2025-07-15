import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";

import { toast } from 'react-toastify';


export default function SignUp() {
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("")
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")

  // Toast functions
  const notifyA = (msg) => toast.error(msg)
  const notifyB = (msg) => toast.success(msg)

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

  const postData = () => {
    //checking email
    if (!emailRegex.test(email)) {
      notifyA("Invalid email")
      return
    } else if (!passRegex.test(password)) {
      notifyA("Password must contain at least 8 characters, including at least 1 number, and include both lower and uppercase letters and special characters (e.g., #, ?, !).");
      return
    }

    // Sending data to server
    fetch("http://localhost:5000/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        userName: userName,
        email: email,
        password: password

      })
    }).then(res => res.json())
      .then(data => {
        if (data.error) {
          notifyA(data.error)
        } else {
          notifyB(data.message)
          navigate("/signin")
        }
        console.log(data)
      })
  }

  return (
    <div className="signUp">
      <div className="form-container">
        <div className="form" style={{ backgroundColor: "transparent", backdropFilter: "blur(50px)", boxShadow: "5px 5px 30px black" }}>
          {/* <img className="signUpLogo" src={logo} alt="" /> */}
          <h1 style={{ fontStyle: "italic", fontFamily: "fantasy", fontSize: "60px", color: "white" }}>XENITH</h1>
          <p className="loginPara">
            Sign up to see photos from the community <br /> shared by your friends.
          </p>
          <div>
            <input type="email" name="email" id="email" value={email} placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
          </div>
          <div>
            <input type="text" name="name" id="name" placeholder="Full Name" value={name} onChange={((e) => { setName(e.target.value) })} />
          </div>
          <div>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              value={userName}
              onChange={(e) => { setUserName(e.target.value) }}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
            />
          </div>
          <input type="submit" id="submit-btn" value="Sign Up" onClick={() => { postData() }} />
        </div>
        <div className="form2" style={{ backgroundColor: "transparent", boxShadow: "5px 5px 30px black", color: "white" }}>
          Already have an account ?
          <Link to="/signin">
            <span style={{ color: "slateblue", cursor: "pointer" }}> Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
