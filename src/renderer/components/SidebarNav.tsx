import React, { useEffect, useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu, sidebarClasses } from 'react-pro-sidebar';
import './SidebarNav.css';
import { Close } from '@mui/icons-material';
import { getChapters } from '../../services/chapterSerivce';
import { Chapter } from '../../models/chapter';
import { useNavigate } from 'react-router-dom';




function SidebarNav({  }: { }) {
  const [collapsed, setCollapsed] = useState(false);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const filteredChapters = chapters.filter(chapter =>
    chapter.name_simple.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const fetchChapters = async () => {
      const data = await getChapters();
      setChapters(data.chapters);
    };

    fetchChapters();
  }, []);

  const handleChapterSelect = (chapterId: number) => {
    navigate(`/chapter/${chapterId}`);
  };


  return (
    <div className="sidebar-container">
      <Sidebar   rootStyles={{
    [`.${sidebarClasses.container}`]: {
      backgroundColor: 'black',
    },
  }}
>
      <Menu>
      <MenuItem onClick={handleToggleSidebar} icon={<Close />}></MenuItem>
          <MenuItem>
            <input
              type="text"
              placeholder="Search chapters"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '5px' }}
            />
          </MenuItem>        {filteredChapters.map((chapter) => (
            <MenuItem key={chapter.id} onClick={() => handleChapterSelect(chapter.id)}>
              {chapter.id} {chapter.name_complex}
            </MenuItem>
          ))}
      </Menu>
    </Sidebar>
    </div>
  );
}

export default SidebarNav;