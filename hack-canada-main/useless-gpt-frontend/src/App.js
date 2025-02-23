import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [animatedAnswer, setAnimatedAnswer] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Function to animate the answer
  useEffect(() => {
    if (answer && !isTyping) {
      setIsTyping(true);
      let index = 0;
      const interval = setInterval(() => {
        if (index < answer.length) {
          setAnimatedAnswer((prev) => prev + answer[index -1]);
          index++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 30); // Adjust the speed of the animation here
    }
  }, [answer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAnimatedAnswer(''); // Clear the animated answer
    setAnswer(''); // Clear the answer
    try {
      const response = await axios.post('http://localhost:5000/ask', { question });
      setAnswer(response.data.answer); // Set the answer to trigger the animation
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
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/042/324/922/small_2x/cute-cartoon-of-a-speech-bubble-png.png"
          alt="Text Bubble"
        />
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

      {animatedAnswer && (
        <div className="answer">
          <h2>Answer:</h2>
          <p>{animatedAnswer}</p>
        </div>
      )}

      <div className="canadian">Proudly made in Canada 🍁</div>
    </div>
  );
}

export default App;