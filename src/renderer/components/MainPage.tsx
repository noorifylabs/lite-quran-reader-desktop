import React, { useEffect, useState } from 'react';
import juzLeft from '../../../assets/juz-art-left.svg';
import juzRight from '../../../assets/juz-art-right.svg';
import './MainPage.css';
import { Juz } from '../../models/juz';
import { getJuzs } from '../../services/juzService';
import { Chapter } from '../../models/chapter';
import { getChapters } from '../../services/chapterSerivce';

const MainPage: React.FC = () => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [combinedJuzs, setCombinedJuzs] = useState<{ [key: number]: { verseKeys: string[], details: Juz, chapterNames: string[] } }>({});

  useEffect(() => {
    const fetchJuzs = async () => {
      const c = await getChapters();
      setChapters(c.chapters);
      const data = await getJuzs();
      const combined = combineJuzs(data.juzs, c.chapters);
      setCombinedJuzs(combined);
    };


    fetchJuzs();
  }, []);

  function combineJuzs(juzs: Juz[], chapters: Chapter[]): { [key: number]: { verseKeys: string[], details: Juz, chapterNames: string[] } } {
    const combinedJuzs: { [key: number]: { verseKeys: string[], details: Juz, chapterNames: string[] } } = {};
  
    juzs.forEach(juz => {
      if (!combinedJuzs[juz.juz_number]) {
        combinedJuzs[juz.juz_number] = {
          verseKeys: [],
          details: juz,
          chapterNames: [],
        };
      }

  
      // Add verse keys
      combinedJuzs[juz.juz_number].verseKeys.push(...Object.keys(juz.verse_mapping));
  
      // Fetch chapter names using verse_mapping keys
      const chapterNames = Object.keys(juz.verse_mapping).map(verseKey => {
        const chapter = chapters.find(ch => ch.id === parseInt(verseKey.split(':')[0])); // Assuming verseKey is in "chapter:verse" format
        return chapter ? chapter.name_complex : 'Unknown Chapter';
      });
  
      combinedJuzs[juz.juz_number].chapterNames.push(...chapterNames);
    });
  
    // Remove duplicates
    for (const juzNumber in combinedJuzs) {
      combinedJuzs[juzNumber].verseKeys = Array.from(new Set(combinedJuzs[juzNumber].verseKeys));
      combinedJuzs[juzNumber].chapterNames = Array.from(new Set(combinedJuzs[juzNumber].chapterNames));
    }
  
    return combinedJuzs;
  }

  return (
    <div className="juz-container">
      {Object.entries(combinedJuzs).map(([juzNumber, juzData]) => (
        <div className="juz-card" key={juzNumber}>
          <h5 className="juz-card__title">
            <a href={`/quran/juz/${juzNumber}`}>{"Juz " + juzNumber}</a>
          </h5>
          {Object.entries(juzData.details.verse_mapping).map(([chapterNumber, ayahRange]) => {
            const chapter = chapters.find(ch => ch.id === parseInt(chapterNumber));
            return chapter ? (
              <a
                key={chapterNumber}
                href={`/ayah-range/${chapter.id}/${ayahRange}`}
                data-controller="track"
                data-name="juz"
                data-category={`${chapter.id}-${chapter.name_simple}`}
              >
                <div className="surah-card">
                  <div className="surah-card__text">
                    <div className="surah-card__latin">
                      <h5>{chapter.name_simple}</h5>
                      <div className="ayah-number-wrapper">
                        <p className="ayah-number">{ayahRange}</p>
                        {chapter.translated_name && (
                          <p className={chapter.translated_name.language_name}>
                            {chapter.translated_name.name}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="surah-card__arabic">
                    <p>
                      <span className={`icon-surah icon-surah${chapter.id}`}></span>
                    </p>
                    <p className="verses-count">{chapter.verses_count} Ayahs</p>
                  </div>
                  </div>
                </div>
              </a>
            ) : null;
          })}
        </div>
      ))}
    </div>
  );
};

export default MainPage;