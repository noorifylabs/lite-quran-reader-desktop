import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ChapterPage.css';
import { VerseUthamniTajweed } from '../../models/verse';
import { ReactComponent as BismillahSVG } from  '../../../assets/images/bismillah.svg';
import { getUthamniTajweed } from '../../services/versesService';
import DOMPurify from 'dompurify';

const ChapterPage = () => {
  const { chapterId, preBismillah } = useParams<{ chapterId: string, preBismillah: string }>();
  const [verses, setVerses] = useState<VerseUthamniTajweed[]>([]);
  const isPreBismillah = preBismillah === 'true';
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchVerses = async () => {
      try {
        if (chapterId) {
          const response = await getUthamniTajweed(parseInt(chapterId));
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
          {isPreBismillah && <BismillahSVG className="bismillah-svg" />}
          </div>
        </div>
        <div className="verses-container">
          {verses.map((verse) => (
            <div key={verse.id} className="TranslationViewCell_cellContainer">
              <div className="TranslationViewCell_actionContainer">
                <div className="TranslationViewCell_actionContainerLeft">
                  <div className="TranslationViewCell_actionItem">
                    <a className="VerseLink_verseLink">
                      {verse.verse_key}
                    </a>
                  </div>
                </div>
              </div>
                <div
                    className="arabic tajweed"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(verse.text_uthmani_tajweed),
                    }}
                  ></div>
              <div className="Separator_base"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChapterPage;
