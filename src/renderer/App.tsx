import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { useState } from 'react';
import SidebarNav from './components/SidebarNav';
import MainPage from './components/MainPage';


function ChapterContent({ content }: { content: string }) {
  return <div className="chapter-content">{content}</div>;
}

export default function App() {
  const [selectedContent, setSelectedContent] = useState('');

  return (
    <div className="app-container">
      <SidebarNav onSelectChapter={setSelectedContent} />
      <div className="content">
        <Router>
          <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/chapter" element={<ChapterContent content={selectedContent} />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}