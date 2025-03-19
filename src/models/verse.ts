
export interface VerseUthamni {
    id: number;
    verse_key: string;
    text_uthmani_simple: string;
  }

  export interface VerseUthamniAdvanced {
    id: number;
    verse_key: string;
    text_uthmani: string;
  }
  
  export interface VerseUthamniTajweed {
    id: number;
    verse_key: string;
    text_uthmani_tajweed: string;
  }
  
  
  export interface VersesUthamniResponse {
    verses: VerseUthamni[];
    meta: {
      filters: {
        chapter_number: string;
      };
    };
  }

  export interface VersesUthamniAdvancedResponse {
    verses: VerseUthamniAdvanced[];
    meta: {
      filters: {
        chapter_number: string;
      };
    };
  }

  export interface VersesUthamniTajweedResponse {
    verses: VerseUthamniTajweed[];
    meta: {
      filters: {
        chapter_number: string;
      };
    };
  }