import React, { useState } from 'react';

const UploadForm = ({ onSubmit, loading }) => {
  const [pdfFile, setPdfFile] = useState(null);
  const [cardCount, setCardCount] = useState(10);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!pdfFile) {
      setError('Please upload a PDF file.');
      return;
    }

    if (!cardCount || isNaN(cardCount)) {
      setError('Please select a valid number of flashcards.');
      return;
    }

    setError('');
    onSubmit(pdfFile, cardCount);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-br from-blue-500 via-gray-300 to-teal-600 p-6 rounded-lg shadow-md space-y-4 max-w-md mx-auto mt-8"
    >
      <label className="block font-semibold text-black">Upload PDF</label>
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setPdfFile(e.target.files[0])}
        className="border p-2 w-full rounded"
      />

      <label className="block font-semibold text-black">Number of Flashcards</label>
      <select
        value={cardCount}
        onChange={(e) => setCardCount(parseInt(e.target.value))}
        className="border p-2 w-full rounded"
      >
        <option value={10}>10</option>
        <option value={15}>15</option>
      </select>

      {error && (
        <div className="text-red-600 text-sm font-semibold text-center">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`${
          loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        } text-white py-2 px-4 rounded w-full transition`}
      >
        {loading ? 'Generating...' : 'Generate Flashcards'}
      </button>
    </form>
  );
};

export default UploadForm;
