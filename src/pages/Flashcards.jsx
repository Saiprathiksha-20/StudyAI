import { useState } from "react";

function Flashcards() {

  const [topic, setTopic] =
    useState("");

  const [flashcards,
    setFlashcards] =
    useState([]);

  const [currentIndex,
    setCurrentIndex] =
    useState(0);

  const [showAnswer,
    setShowAnswer] =
    useState(false);

  const [loading, setLoading] =
    useState(false);


  const generateFlashcards =
    async () => {

      if (!topic) {

        alert(
          "Please enter a topic"
        );

        return;
      }

      setLoading(true);

      try {

        const prompt = `
Generate 5 flashcards about ${topic}.

Return ONLY JSON in this format:

[
  {
    "question": "Question here",
    "answer": "Answer here"
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

              model:
                "openrouter/free",

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

        const parsedCards =
          JSON.parse(cleanJson);

        setFlashcards(parsedCards);

        setCurrentIndex(0);

        setShowAnswer(false);

      } catch (error) {

        console.log(error);

        alert(
          "Error generating flashcards"
        );
      }

      setLoading(false);
    };


  const nextCard = () => {

    if (
      currentIndex <
      flashcards.length - 1
    ) {

      setCurrentIndex(
        currentIndex + 1
      );

      setShowAnswer(false);
    }
  };


  const prevCard = () => {

    if (currentIndex > 0) {

      setCurrentIndex(
        currentIndex - 1
      );

      setShowAnswer(false);
    }
  };


  return (

    <div className="flashcards-page">

      <h1>
        AI Flashcards 🧠
      </h1>


      <div className=
        "flashcard-input-section">

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
          "flashcard-topic-input"
        />

        <button
          className=
          "generate-flashcard-btn"
          onClick={
            generateFlashcards
          }
        >

          {
            loading
              ? "Generating..."
              : "Generate"
          }

        </button>

      </div>


      {
        flashcards.length > 0 && (

          <div className=
            "flashcard-container">

            <div className=
              "flashcard">

              <h2>

                {
                  flashcards[
                    currentIndex
                  ].question
                }

              </h2>


              {
                showAnswer && (

                  <p>

                    {
                      flashcards[
                        currentIndex
                      ].answer
                    }

                  </p>
                )
              }


              <button
                className=
                "show-answer-btn"

                onClick={() =>
                  setShowAnswer(
                    !showAnswer
                  )
                }
              >

                {
                  showAnswer
                    ? "Hide Answer"
                    : "Show Answer"
                }

              </button>

            </div>


            <div className=
              "flashcard-navigation">

              <button
                onClick={prevCard}
              >
                Previous
              </button>

              <button
                onClick={nextCard}
              >
                Next
              </button>

            </div>

          </div>
        )
      }

    </div>
  );
}

export default Flashcards;