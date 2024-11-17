import vnlpAnalysisModel from '~/interfaces/vnlpAnalysisModel';
import toastNotify from './toastNotify';

export const inputWordTypeAnalysis = async (input: string, language?: string) => {
  try {
    console.log(import.meta.env.VITE_VNLP_CORE_URL);
    const response = await fetch(`${import.meta.env.VITE_VNLP_CORE_URL}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sentence: input, language })
    });
    if (!response.ok) {
      toastNotify('Please input your sentence to fetch VNLP Core data', 'error');
    }
    const responseData = await response.json();

    const vnlpCoreAnalysis: vnlpAnalysisModel[] = [...responseData.analysis];

    return vnlpCoreAnalysis;
  } catch (error: any) {
    console.error('Error fetching VNLP Core data:', error);
    throw error(error.message);
  }
};
