import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SidebarNav from './components/SidebarNav';
import MainPage from './components/MainPage';
import ChapterPage from './components/ChapterPage';


export default function App() {

  return (
    <div className="app-container">
              <Router>

            <SidebarNav />
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