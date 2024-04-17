const express = require("express");
const bodyParser = require('body-parser');
const questions = require('./questions.json');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/questions',(req,res)=>{

  const randomQuestion = questions;
  res.json(randomQuestion);
})

app.post('/answer', (req, res) => {
  const { questionId, userAnswer } = req.body;
  const question = questions.find(q => q.id === questionId);
  if (!question) {
      return res.status(404).json({ error: 'Question not found' });
  }
  const correctAnswer = question.options[question.correctAnswer - 1];
  const isCorrect = question.options[userAnswer  - 1]=== correctAnswer;
  res.json({ isCorrect, correctAnswer });
});

app.listen('3000',(req,res)=>{
  console.log("server is running on port: 3000")
})