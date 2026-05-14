import { useState } from "react";

import {
  createUserWithEmailAndPassword
} from "firebase/auth";

import { auth } from "../firebase/firebase";

import { useNavigate, Link }
from "react-router-dom";

function Signup() {

  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const handleSignup =
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
        createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        alert(
          "Account Created ✅"
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
          Create Account 🚀
        </h1>

        <p>
          Join StudyAI and
          start learning smarter.
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
  autoComplete="new-password"
  placeholder="Enter Password"
  value={password}
  onChange={(e) =>
    setPassword(e.target.value)
  }
/>

        <button
          onClick={handleSignup}
        >
          Sign Up
        </button>

        <p className="auth-switch">

          Already have an account?

          <Link to="/login">
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Signup;