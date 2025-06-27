# FlashcardGPT 🧠

An AI-powered flashcard generator that transforms PDFs into interactive, flip-style study cards using GPT-3.5, Node.js, and React.

---

## 🎯 What It Does

- Upload a PDF and select how many flashcards you want.
- The backend extracts text and sends it to GPT-3.5 to generate Q&A flashcards.
- Displays clean, flip-style flashcards with animations for studying.

---

## 🚀 Demo

🎥 [Watch Demo](#) *(Link your screen-recording here once uploaded to GitHub, Google Drive, or YouTube)*

---

## 🛠 Tech Stack

- **Frontend:** React, TailwindCSS, Vite
- **Backend:** Node.js, Express, OpenAI API, pdf-parse
- **Testing:** Jest, Supertest
- **Tools:** Git, GitHub

---

## 💡 Features

✅ Upload PDFs and extract text  
✅ Generate flashcards automatically using GPT-3.5  
✅ Flip-style interactive cards with responsive design  
✅ Error handling, loading spinners, and form validation  
✅ Backend route testing for reliability

---

## 📂 Project Structure

FlashcardGPT/<br>
├── client/ # React frontend<br>
└── server/ # Express backend

---

## 🧑‍💻 Getting Started

1️⃣ Clone the repo:

  - git clone https://github.com/jayesh-joshi21/FlashcardGPT.git
  - cd FlashcardGPT

2️⃣ Install dependencies:

  - cd client
     - npm install

  - cd ../server
     - npm install

3️⃣ Add your OpenAI API Key in server/.env:

  - OPENAI_API_KEY=your_api_key_here

4️⃣ Run the app:

  - Start backend:
    - cd server
    - node app.js
  
  - Start frontend:
    - cd client
    - npm run dev

