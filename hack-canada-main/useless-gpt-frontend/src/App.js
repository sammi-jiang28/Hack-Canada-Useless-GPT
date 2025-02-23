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
      <div className="Header">
        <h1>UselessGPT</h1>
        </div>
        <div className="bubble">
          
          <img src="https://static.vecteezy.com/system/resources/thumbnails/042/324/922/small_2x/cute-cartoon-of-a-speech-bubble-png.png" alt="Text Bubble" />
          <div className="bubble-text">
          Ask me anything and I'll give you the most trustworthy info!
          </div>
        </div>

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
      <div className="canadian">
        Proudly made in Canada 🍁
      </div>
    </div>
  );
}

export default App;