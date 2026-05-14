import { useEffect, useState }
from "react";

import {
  collection,
  getDocs
} from "firebase/firestore";

import {
  useNavigate
} from "react-router-dom";

import {
  db,
  auth
} from "../firebase/firebase";

function Dashboard() {

  const navigate =
    useNavigate();

  const [pdfCount,
    setPdfCount] =
    useState(0);

  const [loading,
    setLoading] =
    useState(true);


  useEffect(() => {

    const fetchPDFs =
      async () => {

        try {

          const querySnapshot =
            await getDocs(

              collection(
                db,
                "users",
                auth.currentUser.uid,
                "pdfs"
              )
            );

          setPdfCount(
            querySnapshot.size
          );

        } catch (error) {

          console.log(error);
        }

        setLoading(false);
      };

    fetchPDFs();

  }, []);


  return (

    <div className="dashboard-page">

      <h1>
        Welcome Back 👋
      </h1>

      <p
        className="dashboard-user"
      >

        Logged in as:
        {" "}
        {auth.currentUser?.email}

      </p>


      {
        loading ? (

          <h2>
            Loading Dashboard...
          </h2>

        ) : (

          <div className=
            "dashboard-grid"
          >


            {/* UPLOAD */}

            <div
              className=
              "dashboard-card"

              onClick={() =>
                navigate("/upload")
              }
            >

              <h2>
                📄 Uploaded PDFs
              </h2>

              <p>
                {pdfCount}
                {" "}
                PDFs uploaded and
                stored securely.
              </p>

            </div>


            {/* QUIZ */}

            <div
              className=
              "dashboard-card"

              onClick={() =>
                navigate("/quiz")
              }
            >

              <h2>
                🧠 AI Quiz Generator
              </h2>

              <p>

                Generate intelligent
                quizzes instantly using AI.

              </p>

            </div>


            {/* SUMMARIZER */}

            <div
              className=
              "dashboard-card"

              onClick={() =>
                navigate("/summarizer")
              }
            >

              <h2>
                ✨ AI Summarizer
              </h2>

              <p>

                Summarize long notes
                into easy concepts.

              </p>

            </div>


            {/* FLASHCARDS */}

            <div
              className=
              "dashboard-card"

              onClick={() =>
                navigate("/flashcards")
              }
            >

              <h2>
                📚 Flashcards
              </h2>

              <p>

                Create smart revision
                flashcards instantly.

              </p>

            </div>

          </div>
        )
      }

    </div>
  );
}

export default Dashboard;