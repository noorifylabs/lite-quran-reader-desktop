export interface VerseMapping {
    [key: string]: string;
  }
  
  export interface Juz {
    id: number;
    juz_number: number;
    verse_mapping: VerseMapping;
    first_verse_id: number;
    last_verse_id: number;
    verses_count: number;
  }
  
  export interface JuzsResponse {
    juzs: Juz[];
  }