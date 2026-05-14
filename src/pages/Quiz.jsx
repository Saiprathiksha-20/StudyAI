import { useState } from "react";

function Quiz() {

  const [topic, setTopic] =
    useState("");

  const [questions, setQuestions] =
    useState([]);

  const [selectedAnswers,
    setSelectedAnswers] =
    useState({});

  const [showScore, setShowScore] =
    useState(false);

  const [loading, setLoading] =
    useState(false);


  const generateQuiz = async () => {

    if (!topic) {

      alert("Please enter a topic");

      return;
    }

    setLoading(true);

    try {

      const prompt = `
Generate 5 PROFESSIONAL multiple choice quiz questions about ${topic}.

Rules:
- Questions must be meaningful
- Options must be realistic
- Do NOT use placeholders like A/B/C/D
- Return ONLY JSON
- Each question must have 4 proper options
- One correct answer

Format:

[
  {
    "question": "Question here",
    "options": [
      "Option 1",
      "Option 2",
      "Option 3",
      "Option 4"
    ],
    "answer": "Correct Option"
  }
]
`;

      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization: `Bearer ${
              import.meta.env
                .VITE_OPENROUTER_API_KEY
            }`,
          },

          body: JSON.stringify({

            model: "openrouter/free",

            messages: [
              {
                role: "user",
                content: prompt,
              },
            ],

          }),
        }
      );

      const data =
        await response.json();

      console.log(data);

      const text =
        data.choices[0]
          .message.content;

      const jsonStart =
        text.indexOf("[");

      const jsonEnd =
        text.lastIndexOf("]")
        + 1;

      const cleanJson =
        text.slice(
          jsonStart,
          jsonEnd
        );

      const parsedQuiz =
        JSON.parse(cleanJson);

      setQuestions(parsedQuiz);

      setSelectedAnswers({});

      setShowScore(false);

    } catch (error) {

      console.log(error);

      alert(
        "Error generating quiz"
      );
    }

    setLoading(false);
  };


  const handleAnswerClick = (
    questionIndex,
    option
  ) => {

    if (showScore) return;

    setSelectedAnswers({
      ...selectedAnswers,

      [questionIndex]: option,
    });
  };


  const calculateScore = () => {

    let score = 0;

    questions.forEach(
      (quiz, index) => {

        if (
          selectedAnswers[index] ===
          quiz.answer
        ) {
          score++;
        }
      }
    );

    return score;
  };


  return (

    <div className="quiz-page">

      <h1>
        AI Quiz Generator 🧠
      </h1>


      <div className=
        "quiz-input-section">

        <input
          type="text"
          placeholder=
          "Enter topic like React, DBMS..."
          value={topic}
          onChange={(e) =>
            setTopic(
              e.target.value
            )
          }
          className=
          "quiz-topic-input"
        />

        <button
          className=
          "generate-quiz-btn"
          onClick={generateQuiz}
        >

          {
            loading
              ? "Generating..."
              : "Generate Quiz"
          }

        </button>

      </div>


      {
        questions.map(
          (quiz, index) => (

            <div
              className="quiz-card"
              key={index}
            >

              <h3>
                {index + 1}.
                {" "}
                {quiz.question}
              </h3>


              <div
                className=
                "quiz-options"
              >

                {
                  quiz.options.map(
                    (option, i) => {

                      const isCorrect =
                        option ===
                        quiz.answer;

                      const isSelected =
                        selectedAnswers[
                          index
                        ] === option;

                      return (

                        <button
                          key={i}

                          onClick={() =>
                            handleAnswerClick(
                              index,
                              option
                            )
                          }

                          className={
                            showScore
                              ? (
                                  isCorrect
                                    ? "correct-option"
                                    : (
                                        isSelected
                                        ? "wrong-option"
                                        : ""
                                      )
                                )
                              : (
                                  isSelected
                                    ? "selected-option"
                                    : ""
                                )
                          }
                        >

                          {option}

                        </button>
                      );
                    }
                  )
                }

              </div>

            </div>
          )
        )
      }


      {
        questions.length > 0 && (

          <button
            className=
            "submit-quiz-btn"
            onClick={() =>
              setShowScore(true)
            }
          >
            Submit Quiz
          </button>
        )
      }


      {
        showScore && (

          <div className="score-box">

            <h2>

              You scored {" "}

              {calculateScore()}

              {" / "}

              {questions.length}

            </h2>

          </div>
        )
      }

    </div>
  );
}

export default Quiz;