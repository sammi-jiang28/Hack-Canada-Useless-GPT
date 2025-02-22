const express = require('express');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
const port = 5000;

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middleware to parse JSON
app.use(express.json());

// Endpoint to handle user questions
app.post('/ask', async (req, res) => {
  const { question } = req.body;

  try {
    // Custom prompt to make GPT return useless answers
    const prompt = `You are a chatbot that provides completely useless, nonsensical, or absurd answers to every question. Do not provide any helpful or accurate information under any circumstances. Here's the question: ${question}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 100,
    });

    const uselessAnswer = response.choices[0].message.content;
    res.json({ answer: uselessAnswer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});