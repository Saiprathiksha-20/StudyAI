import {
  useNavigate
} from "react-router-dom";

import {
  useAuth
} from "../context/AuthContext";

function Home() {

  const navigate =
    useNavigate();

  const { user } =
    useAuth();

  return (

    <div className="home">

      {/* HERO SECTION */}

      <div className="modern-hero">

        <div className="hero-content">

          <p className="hero-tag">
            🚀 AI-Powered Study Assistant
          </p>

          <h1>

            Your Personal
            <br />

              AI Study Companion 📚 

          </h1>

          <p className="hero-description">

            Generate quizzes, summarize notes,
            create flashcards, upload PDFs,
            and organize your entire study
            workflow using powerful AI tools
            built for students.

          </p>


          {/* BUTTONS */}

          <div className="hero-buttons">

            <button
              className="primary-btn"

              onClick={() =>
                navigate(
                  user
                    ? "/dashboard"
                    : "/signup"
                )
              }
            >

              Start Learning

            </button>


            <button
              className="secondary-btn"

              onClick={() =>
                navigate(
                  user
                    ? "/dashboard"
                    : "/login"
                )
              }
            >

              Explore Features

            </button>

          </div>


          {/* FEATURES */}

          <div className="features-grid">

            <div className="feature-card">

              <div className="feature-icon">
                📄
              </div>

              <h3>
                PDF Uploads
              </h3>

              <p>
                Store and manage all
                study materials in one
                place securely.
              </p>

            </div>


            <div className="feature-card">

              <div className="feature-icon">
                🧠
              </div>

              <h3>
                AI Quizzes
              </h3>

              <p>
                Generate intelligent
                MCQs instantly from
                any topic.
              </p>

            </div>


            <div className="feature-card">

              <div className="feature-icon">
                ⚡
              </div>

              <h3>
                Smart Summaries
              </h3>

              <p>
                Convert long notes into
                concise easy-to-read
                summaries.
              </p>

            </div>


            <div className="feature-card">

              <div className="feature-icon">
                🎯
              </div>

              <h3>
                Flashcards
              </h3>

              <p>
                Revise concepts quickly
                with AI-generated
                flashcards.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Home;