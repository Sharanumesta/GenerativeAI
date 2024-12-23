import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [responses, setResponses] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (input.trim() === "") return;
      const result = await axios.post("http://localhost:8080/prompt", {
        contents: [
          {
            parts: [
              {
                text: `${input}`,
              },
            ],
          },
        ],
      });
      setResponses((prevResponses) => [
        ...prevResponses,
        { user: input, bot: result.data.response },
      ]);

      setInput("");
    } catch (error) {
      console.log("Error while response", error);
    }
  };

  return (
    <div className="container">
      <h2>Simple Chat AI</h2>
      <div className="chat-window">
        {responses.map((res, index) => (
          <div key={index} className="chat">
            <div className="user-message">
              <strong>User:</strong> {res.user}
            </div>
            <div className="bot-response">
              <strong>Bot:</strong> {res.bot}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="prompt">
          <input
            type="text"
            name="prompt"
            id="prompt"
            value={input}
            onChange={handleInputChange}
            placeholder="Enter your prompt..."
          />
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
}

export default App;
