import { MemoryRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import { useState } from 'react';
import SidebarNav from './components/SidebarNav';
import MainPage from './components/MainPage';
import ChapterPage from './components/ChapterPage';


export default function App() {
  const [selectedChapter, setSelectedChapter] = useState(0);

  return (
    <div className="app-container">
              <Router>

            <SidebarNav onSelectChapter={setSelectedChapter} />
      <div className="content">
          <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/chapter/:chapterId" element={<ChapterPage />} />
          </Routes>
      </div>
      </Router>
    </div>
  );
}