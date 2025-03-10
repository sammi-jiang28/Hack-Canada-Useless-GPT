import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [animatedAnswer, setAnimatedAnswer] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const answerRef = useRef(null); // Ref for the scrollable container

  // Function to animate the answer
  useEffect(() => {
    if (answer && !isTyping) {
      setIsTyping(true);
      let index = 0;
      const interval = setInterval(() => {
        if (index < answer.length) {
          setAnimatedAnswer((prev) => prev + answer[index-1]);
          index++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 50); // Adjust the speed of the animation here
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
          src="https://media.discordapp.net/attachments/1340816099591065610/1343210206536138854/pxArt_3.png?ex=67bc717c&is=67bb1ffc&hm=356a9cbc567ec94174ba57639232c41e4d1cb06d10bd89e5b9997038194e8972&=&format=webp&quality=lossless&width=725&height=500"
          alt="Text Bubble"
        />
        
        <div className="bubble-text">
          Ask me anything and I'll give you the most trustworthy info!
        </div>
      </div>
      {/* <!-- this part needs changing --> */}
      <div className="beaver">
        <img
          src = "https://cdn.discordapp.com/attachments/1340816099591065610/1343108380935458826/pxArt_1.png?ex=67bc12a7&is=67bac127&hm=cfdd5037283a15a84cce9cd83a9e6cd91e6302174fc0a3f74688949d109e3d9d&"
          alt = "beaver"
          />
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
        <div className="answer" ref={answerRef}>
          <h2>Answer:</h2>
          <p>{animatedAnswer}</p>
        </div>
      )}

      <div className="canadian">Proudly made in Canada 🍁</div>
    </div>
  );
}

export default App;