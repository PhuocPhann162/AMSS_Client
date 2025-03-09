import { plantSuggestModel } from '@/interfaces';

const getPlantSuggest = async (id: string): Promise<plantSuggestModel> => {
  try {
    const response = await fetch(
      `https://perenual.com/api/species/details/${id}?key=${import.meta.env.VITE_PLANT_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch forecast data');
    }

    const responseData: plantSuggestModel = await response.json();

    return responseData;
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw error;
  }
};

const getPlanListSuggest = async (page: number): Promise<any> => {
  try {
    const response = await fetch(
      `https://perenual.com/api/species-list?key=${import.meta.env.VITE_PLANT_API_KEY}&edible=1&page=${page}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch forecast data');
    }

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw error;
  }
};

export { getPlantSuggest, getPlanListSuggest };
