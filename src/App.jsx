import React from 'react';
import { FaInstagram } from 'react-icons/fa';
import PwnedChecker from './components/PwnedChecker';
import FakeInstagramProfile from './components/FakeInstagramProfile'; // Import your new component
import './App.css';

function App() {
  return (
    <div className="app-container">
      <a
        href="https://www.instagram.com/taqydev"
        target="_blank"
        rel="noopener noreferrer"
        className="header-link"
      >
        <span>صُنِعَ بواسطة</span>
        <FaInstagram />
        <span>@taqydev</span>
      </a>

      <main>
        <PwnedChecker />
        <FakeInstagramProfile /> {/* Use your new component here */}
      </main>
    </div>
  );
}

export default App;