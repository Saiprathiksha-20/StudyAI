import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  signOut
} from "firebase/auth";

import { auth }
from "../firebase/firebase";

import {
  useAuth
} from "../context/AuthContext";


function Navbar() {

  const navigate =
    useNavigate();

  const { user } =
    useAuth();


  const handleLogout =
    async () => {

      await signOut(auth);

      navigate("/");
    };


  return (

    <nav className="navbar">

      <h1 className="logo">
        StudyAI
      </h1>

      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        {
          !user ? (

            <>

              <Link to="/login">
                Login
              </Link>

              <Link to="/signup">
                Signup
              </Link>

            </>

          ) : (

            <>

              <Link to="/dashboard">
                Dashboard
              </Link>

              <Link to="/upload">
                Upload
              </Link>

              <Link to="/summarizer">
                Summarizer
              </Link>

              <Link to="/quiz">
                Quiz
              </Link>

              <Link to="/flashcards">
                Flashcards
              </Link>

              <button
                className=
                "logout-btn"

                onClick={
                  handleLogout
                }
              >

                Logout

              </button>

            </>

          )
        }

      </div>

    </nav>
  );
}

export default Navbar;