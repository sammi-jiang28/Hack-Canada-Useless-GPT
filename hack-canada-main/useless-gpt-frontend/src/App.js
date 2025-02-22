import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/ask', { question });
      setAnswer(response.data.answer);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setAnswer('Oops! Something went wrong. Try again please.');
    }
  };

  return (
    <div className="App">
      <h1>Useless GPT: Canadian Edition</h1>
      <p>Ask me anything, and I'll give you a completely useless answer related to Canada!</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question here, buddy..."
          required
        />
        <button type="submit">Ask</button>
      </form>
      {answer && (
        <div className="answer">
          <h2>Answer:</h2>
          <p>{answer}</p>
        </div>
      )}
      <div className="canadian-theme">
        <p>Proudly made in Canada 🍁</p>
      </div>
    </div>
  );
}

export default App;