import { useState } from "react";

function Summarizer() {

  const [notes, setNotes] = useState("");

  const [summary, setSummary] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSummarize = async () => {

    if (!notes) {

      alert("Please enter notes");

      return;
    }

    setLoading(true);

    try {

      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          },

          body: JSON.stringify({

            model: "llama-3.1-8b-instant",

            messages: [
              {
                role: "user",
                content:
                  `Summarize these study notes clearly:\n${notes}`
              }
            ]
          }),
        }
      );

      const data =
        await response.json();

      console.log(data);

      if (data.error) {

  console.log(data.error);

  alert(data.error.message);

} else {

  setSummary(
    data.choices[0].message.content
  );
}

    } catch (error) {

      console.log(error);

     
alert(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="upload-page">

      <h1>
        AI Notes Summarizer 🤖
      </h1>

      <textarea
        rows="10"
        placeholder="Paste your notes here..."
        value={notes}
        onChange={(e) =>
          setNotes(e.target.value)
        }
        className="notes-input"
      />

      <button
        onClick={handleSummarize}
        className="summarize-btn"
      >

        {
          loading
          ? "Generating..."
          : "Generate Summary"
        }

      </button>

      {
        summary && (

          <div className="summary-box">

            <h2>
              AI Summary
            </h2>

            <p style={{ whiteSpace: "pre-line" }}>
              {summary}
            </p>

          </div>
        )
      }

    </div>
  );
}

export default Summarizer;