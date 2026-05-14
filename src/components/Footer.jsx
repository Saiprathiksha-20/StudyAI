import {
  Link
} from "react-router-dom";

function Footer() {

  return (

    <footer className="footer">

      <div className="footer-container">


        {/* LEFT */}

        <div className="footer-section">

          <h2 className="footer-logo">
            StudyAI
          </h2>

          <p>

            Your AI-powered learning
            companion for quizzes,
            flashcards, PDF analysis,
            and smart note summarization.

          </p>

        </div>


        {/* QUICK LINKS */}

        <div className="footer-section">

          <h3>
            Quick Links
          </h3>

          <Link to="/">
            Home
          </Link>

          <Link to="/dashboard">
            Dashboard
          </Link>

          <Link to="/upload">
            Upload PDFs
          </Link>

          <Link to="/quiz">
            AI Quiz
          </Link>

        </div>


        {/* FEATURES */}

        <div className="footer-section">

          <h3>
            Features
          </h3>

          <p>
            AI Summarizer
          </p>

          <p>
            Smart Flashcards
          </p>

          <p>
            Quiz Generator
          </p>

          <p>
            PDF Study Library
          </p>

        </div>


        {/* CONTACT */}

        <div className="footer-section">

          <h3>
            Contact
          </h3>

          <p>
            prathiksha49108@gmail.com
          </p>

          <p>
            Hyderabad, India
          </p>

          <p>
            +91 9398569053
          </p>

        </div>

      </div>


      {/* BOTTOM */}

      <div className="footer-bottom">

        © 2026 StudyAI —
        All Rights Reserved.

      </div>

    </footer>
  );
}

export default Footer;