require('dotenv').config();
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});


const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdfParse = require('pdf-parse');

const app = express();

app.use(cors()); 
app.use(express.json()); 

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } 
});


app.post('/upload', upload.single('pdf'), async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;
    console.log("Received file upload");
    console.log("Count from form:", req.body.count);

    const data = await pdfParse(fileBuffer); 
    const extractedText = data.text;
    const count = parseInt(req.body.count) || 10; 

    const prompt = `
    Generate exactly ${count} flashcards from the text below. 
    Each flashcard must have a question and an answer in this format:
    Q: [question]
    A: [answer]

    Do not include any additional text or explanations.
    Text:
    ${extractedText}
    `;


    console.log("Sending prompt to OpenAI:");
    console.log(prompt);

    const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
    });

    const responseText = completion.choices[0].message.content;
    res.json({ flashcards: responseText });


  } catch (error) {
  console.error("Error occurred:", error.message);
  res.status(500).json({ error: error.message || 'Failed to process PDF' });
}
});


if (require.main === module) {
  app.listen(5000, () => {
    console.log('Server running at http://localhost:5000');
  });
}

module.exports = app;

