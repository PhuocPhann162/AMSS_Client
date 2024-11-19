import { PROVINCE_CODES } from '~/constants/provinceTemplate';
import vnlpAnalysisModel from '~/interfaces/vnlpAnalysisModel';

export const findProvinceCode = (analysis: vnlpAnalysisModel[]): string | null => {
  const propnWords: string[] = [];
  for (const item of analysis) {
    if (item.pos === 'PROPN') {
      propnWords.push(item.word);
    }
  }
  const provinceName = propnWords.join(' ');
  return PROVINCE_CODES[provinceName] || null;
};
