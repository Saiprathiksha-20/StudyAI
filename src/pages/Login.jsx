import { useState } from "react";

import {
  signInWithEmailAndPassword
} from "firebase/auth";

import { auth }
from "../firebase/firebase";

import { useNavigate, Link }
from "react-router-dom";

function Login() {

  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const handleLogin =
    async () => {

      if (
        !email || !password
      ) {

        alert(
          "Please fill all fields"
        );

        return;
      }

      try {

        await
        signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        alert(
          "Login Successful ✅"
        );

        navigate("/dashboard");

      } catch (error) {

        alert(error.message);
      }
    };

  return (

    <div className="login-page">

      <div className="login-box">

        <h1>
          Welcome Back 👋
        </h1>

        <p>
          Login to continue
          your AI learning journey.
        </p>

       <input
  type="email"
  name="email"
  autoComplete="email"
  placeholder="Enter Email"
  value={email}
  onChange={(e) =>
    setEmail(e.target.value)
  }
/>

<input
  type="password"
  name="password"
  autoComplete="current-password"
  placeholder="Enter Password"
  value={password}
  onChange={(e) =>
    setPassword(e.target.value)
  }
/>
        <button
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="auth-switch">

          New user?

          <Link to="/signup">
            Create Account
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;