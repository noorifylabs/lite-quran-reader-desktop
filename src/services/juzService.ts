import { JuzsResponse } from '../models/juz';
import apiClient from './apiClient';

export const getJuzs = async (): Promise<JuzsResponse> => {
  try {
    const response = await apiClient.get<JuzsResponse>('/juzs');
    return response.data;
  } catch (error) {
    console.error('Error fetching Juzs:', error);
    throw error;
  }
};