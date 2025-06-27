import React, { useState } from 'react';

const Flashcard = ({ question, answer }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="w-full h-48 perspective" onClick={() => setFlipped(!flipped)}>
      <div className={`relative w-full h-full duration-500 transform-style preserve-3d transition-transform ${flipped ? 'rotate-y-180 ' : ''}slow-flip`}>
        
        {/* Front */}
        <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-purple-400 to-purple-50 text-white rounded-lg p-4 flex items-center justify-center text-center shadow-md">
          <p className="text-gray-800 font-semibold">{question}</p>
        </div>

        {/* Back */}
        <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-blue-300 to-teal-500 rounded-lg p-4 flex items-center justify-center text-center shadow-md transform rotate-y-180">
          <p className="text-black">{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
