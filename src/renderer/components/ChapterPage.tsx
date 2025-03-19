import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ChapterPage.css';
import { VerseUthamni, VerseUthamniAdvanced } from '../../models/verse';
import { getUthamni } from '../../services/versesService';

const ChapterPage = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const [verses, setVerses] = useState<VerseUthamniAdvanced[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVerses = async () => {
      try {
        if (chapterId) {
          const response = await getUthamni(parseInt(chapterId));
          setVerses(response.verses);
        }
      } catch (err) {
        console.error('Error fetching verses:', err);
        setError('Failed to load verses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchVerses();
  }, [chapterId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="TranslationView_container">
      <div>
        <div className="ChapterHeader_container">
          <div className="ChapterHeader_header">
            <div className="ChapterHeader_chapterIconContainer">
              <span className="ChapterIconContainer_iconContainer">
              <p>
                      <span className={`icon-surah icon-surah${chapterId}`}></span>
                      <span className={`icon-surah icon-surah-surah`}></span>

                    </p>
              </span>
            </div>
          </div>
          <div className="ChapterHeader_bismillahContainer">
            <p className="bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
          </div>
        </div>
        <div className="verses-container">
          {verses.map((verse) => (
            <div key={verse.id} className="TranslationViewCell_cellContainer">
              <div className="TranslationViewCell_actionContainer">
                <div className="TranslationViewCell_actionContainerLeft">
                  <div className="TranslationViewCell_actionItem">
                    <a href={`/${chapterId}?startingVerse=${verse.verse_key}`} className="VerseLink_verseLink">
                      {verse.verse_key}
                    </a>
                  </div>
                </div>
              </div>
              <div className="TranslationViewCell_contentContainer">
                <div className="TranslationViewCell_arabicVerseContainer">
                  <h1 className="VerseText_verseText">{verse.text_uthmani}</h1>
                </div>
              </div>
              <div className="Separator_base"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChapterPage;