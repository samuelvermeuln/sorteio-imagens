/* eslint-disable @next/next/no-img-element */
import React from "react";

interface CompletionMessageProps {
  lastDrawn: string;
}

const CompletionMessage: React.FC<CompletionMessageProps> = ({ lastDrawn }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center">
        <h2 className="text-2xl font-bold mb-4">Sorteio Concluído!</h2>
        <p className="mb-4">Todos os participantes foram sorteados.</p>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Último Sorteado:</h3>
          <img
            src={lastDrawn}
            alt="Último sorteado"
            className="w-32 h-32 mx-auto rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default CompletionMessage;
