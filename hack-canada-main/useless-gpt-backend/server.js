const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");

require('dotenv').config();

const app = express();
const port = 5000;


//gemini

// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI("AIzaSyBfn_Pg7qGTOTtSBpKO0cTI7fxkcqVGQQE");
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const prompt = "Explain how AI works";

// const result = await model.generateContent(prompt);
// console.log(result);

// Initialize OpenAI
/*
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
*/

// CORS
const allowedOrigins = ['http://localhost:3000'];

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});



// Middleware to parse JSON
app.use(express.json());

// Function to generate mock responses
const generateMockResponse = () => {
  const mockResponses = [
    `I'm sorry, I can't answer that. I'm too busy eating pancakes.`,
    `The answer is 42. Always 42.`,
    `Why don't you ask a squirrel? They know everything.`,
    `I would tell you, but I forgot the question.`,
    `The answer lies somewhere in the Bermuda Triangle. Good luck finding it!`,
    `I'm not sure, but I bet it involves cheese.`,
    `The answer is blowing in the wind.`,
    `I could tell you, but then I'd have to charge you $1,000,000.`,
  ];
  return mockResponses[Math.floor(Math.random() * mockResponses.length)];
};


// Endpoint to handle user questions
app.post('/ask', async (req, res) => {
  const { question } = req.body;

  try
  {
    // Custom prompt to make GPT return useless answers
    const prompt = `You are a chatbot that provides bogus advice to the user; this advice should also be somehow related to Canada. Do not provide any helpful or accurate information under any circumstances. Here's the question: ${question}`;

    const genAI = new GoogleGenerativeAI("AIzaSyBfn_Pg7qGTOTtSBpKO0cTI7fxkcqVGQQE");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);

    const uselessAnswer = result.response.text();
    res.json({ answer: uselessAnswer });
  } catch (error) {
    console.error('Error using Gemini API:', error);

    // If Gemini fails, use a mock response
    const mockAnswer = generateMockResponse();
    res.json({ answer: mockAnswer });
  }
});


// testing using localhost:3000/gemini
app.get('/gemini', async (req, res) => {
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = "Explain how AI works";

  const result = await model.generateContent(prompt);
  console.log(result.response.text());
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});