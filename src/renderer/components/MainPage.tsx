import React, { useEffect, useState } from 'react';
import juzLeft from '../../../assets/juz-art-left.svg';
import juzRight from '../../../assets/juz-art-right.svg';
import './MainPage.css';
import { Juz } from '../../models/juz';
import { getJuzs } from '../../services/juzService';

const MainPage: React.FC = () => {
  function combineJuzs(juzs: Juz[]): { [key: number]: string[] } {
    const combinedJuzs: { [key: number]: string[] } = {};

    juzs.forEach(juz => {
        if (!combinedJuzs[juz.juz_number]) {
            combinedJuzs[juz.juz_number] = [];
        }
        combinedJuzs[juz.juz_number].push(...Object.keys(juz.verse_mapping));
    });

    // Remove duplicates
    for (const juzNumber in combinedJuzs) {
      combinedJuzs[juzNumber] = Array.from(new Set(combinedJuzs[juzNumber]));
    }

    return combinedJuzs;
  }
  const [combinedJuzs, setCombinedJuzs] = useState<{ [key: number]: string[] }>({});

  useEffect(() => {
    const fetchJuzs = async () => {
      const data = await getJuzs();
      const combined = combineJuzs(data.juzs);
      setCombinedJuzs(combined);
    };

    fetchJuzs();
  }, []);

  return (
    <div className="juz-container">
      {Object.entries(combinedJuzs).map(([juzNumber, verseKeys]) => (
        <div key={juzNumber} className="juz-item">
          <h2>Juz {juzNumber}</h2>
          <ul>
            {verseKeys.map((key, index) => (
              <li key={index}>{key}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MainPage;