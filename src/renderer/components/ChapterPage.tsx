import React from 'react';
import { useParams } from 'react-router-dom';

const ChapterPage = () => {
  const { chapterId } = useParams<{ chapterId: string }>();

  return (
    <div>
      <h1>Chapter {chapterId}</h1>
      {/* Add your chapter content here */}
    </div>
  );
};

export default ChapterPage;