import { VersesUthamniAdvancedResponse, VersesUthamniResponse, VersesUthamniTajweedResponse } from '../models/verse';
import apiClient from './apiClient';


export const getUthamniSimple = async (chapterNumber: number): Promise<VersesUthamniResponse> => {
  try {
    const response = await apiClient.get<VersesUthamniResponse>(`/quran/verses/uthmani_simple`, {
      params: {
        chapter_number: chapterNumber,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching verses:', error);
    throw error;
  }
};


export const getUthamni = async (chapterNumber: number): Promise<VersesUthamniAdvancedResponse> => {
  try {
    const response = await apiClient.get<VersesUthamniAdvancedResponse>(`/quran/verses/uthmani`, {
      params: {
        chapter_number: chapterNumber,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching verses:', error);
    throw error;
  }
};


export const getUthamniTajweed = async (chapterNumber: number): Promise<VersesUthamniTajweedResponse> => {
  try {
    const response = await apiClient.get<VersesUthamniTajweedResponse>(`/quran/verses/uthmani_tajweed`, {
      params: {
        chapter_number: chapterNumber,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching verses:', error);
    throw error;
  }
};