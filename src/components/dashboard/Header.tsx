import React from 'react';

function Header() {
  return (
    <header className="relative bg-blue-600 text-white py-6 rounded-md shadow-md overflow-hidden sm:py-8 md:py-10 lg:py-12">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 opacity-70"></div>
      <div className="relative z-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold">COVID-19 Dashboard</h1>
        <p className="mt-2 text-base sm:text-lg">Up-to-date global statistics and trends</p>
      </div>
    </header>
  );
}

export default Header;