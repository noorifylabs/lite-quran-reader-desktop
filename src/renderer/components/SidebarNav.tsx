import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import './SidebarNav.css';
import { Home } from '@mui/icons-material';

const chapters = [
  { id: 1, title: 'Chapter 1', content: 'Content of Chapter 1' },
  { id: 2, title: 'Chapter 2', content: 'Content of Chapter 2' },
  { id: 3, title: 'Chapter 3', content: 'Content of Chapter 3' },
  // Add more chapters as needed
];

function SidebarNav({ onSelectChapter }: { onSelectChapter: (content: string) => void }) {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="sidebar-container">
    <Sidebar collapsed={collapsed}>
      <Menu>
        <MenuItem icon={<Home />}></MenuItem>
        {chapters.map((chapter) => (
            <MenuItem key={chapter.id} onClick={() => onSelectChapter(chapter.content)}>
              {chapter.title}
            </MenuItem>
          ))}
      </Menu>
      <button onClick={handleToggleSidebar}>Toggle Sidebar</button>
    </Sidebar>
    </div>
  );
}

export default SidebarNav;