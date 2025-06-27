import React, { useState } from 'react';
import UploadForm from './components/uploadform';
import Flashcard from './components/flashcard';

function App() {
  const [flashcards, setFlashcards] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFormSubmit = async (file, count) => {
    const formData = new FormData();
    formData.append('pdf', file);
    formData.append('count', count);

    setLoading(true);
    setError('');
    setFlashcards(null);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to generate flashcards');
      }

      const data = await response.json();
      console.log("Extracted Flashcards:", data.flashcards);

      setFlashcards(data.flashcards);

      setTimeout(() => {
        window.scrollTo({ top: 500, behavior: 'smooth' });
      }, 300);

    } catch (error) {
      console.error("Upload failed:", error);
      setError('Something went wrong. Please try again or use a smaller PDF.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(60deg,_rgb(247,_149,_51),_rgb(243,_112,_85),_rgb(239,_78,_123),_rgb(161,_102,_171),_rgb(80,_115,_184),_rgb(16,_152,_173),_rgb(7,_179,_155),_rgb(111,_186,_130))]   pt-10">
      <h1 className="text-3xl font-bold text-center text-white">FlashcardGPT</h1>

      <UploadForm onSubmit={handleFormSubmit} loading={loading} />

      {/* Loading spinner */}
      {loading && (
        <div className="flex justify-center mt-6">
          <div className="lds-ring text-white">
            <div></div><div></div><div></div><div></div>
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="mt-4 text-red-600 text-center font-semibold">
          {error}
        </div>
      )}

      {/* Rendering flashcards */}
      {flashcards && (
        <div className="max-w-5xl mx-auto mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {flashcards.split('\n\n').map((pair, index) => {
            const [qLine, aLine] = pair.split('\n');
            if (!qLine || !aLine || !qLine.includes('Q:') || !aLine.includes('A:')) {
              return null; 
            }
            const question = qLine.replace(/^Q:\s*/i, '').trim();
            const answer = aLine.replace(/^A:\s*/i, '').trim();
            return (
              <Flashcard
                key={index}
                question={question}
                answer={answer}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
