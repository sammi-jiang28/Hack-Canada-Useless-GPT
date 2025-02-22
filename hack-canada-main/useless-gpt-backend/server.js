const express = require('express');
const { OpenAI } = require('openai');
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

// Endpoint to handle user questions

app.post('/ask', async (req, res) => {
  const { question } = req.body;

  try
  {
    // Custom prompt to make GPT return useless answers
    const prompt = `You are a chatbot that provides completely useless, nonsensical, or absurd answers to every question. Do not provide any helpful or accurate information under any circumstances. Here's the question: ${question}`;

    const genAI = new GoogleGenerativeAI("AIzaSyBfn_Pg7qGTOTtSBpKO0cTI7fxkcqVGQQE");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);

    const uselessAnswer = result.response.text();
    res.json({ answer: uselessAnswer });
  }
  catch (error)
  {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
});


// testing using localhost:3000/gemini
app.get('/gemini', async (req, res) => {
  const genAI = new GoogleGenerativeAI("AIzaSyBfn_Pg7qGTOTtSBpKO0cTI7fxkcqVGQQE");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = "Explain how AI works";

  const result = await model.generateContent(prompt);
  console.log(result.response.text());
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});