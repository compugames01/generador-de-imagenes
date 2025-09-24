
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center py-4 border-b-2 neon-border rounded-lg bg-black/20 backdrop-blur-sm">
      <h1 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-bold text-cyan-300 neon-text">
        Bienvenido al Analizador
      </h1>
      <p className="mt-2 text-gray-300 text-sm sm:text-base">
        esto es una beta
      </p>
    </header>
  );
};
