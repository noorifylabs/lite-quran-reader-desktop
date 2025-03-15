import { ChaptersResponse } from '../models/chapter';
import apiClient from './apiClient';

export const getChapters = async (): Promise<ChaptersResponse> => {
    try {
      const response = await apiClient.get<ChaptersResponse>('/chapters');
      return response.data;
    } catch (error) {
      console.error('Error fetching chapters:', error);
      throw error;
    }
  };