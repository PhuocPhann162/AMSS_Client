import { DatePicker } from 'antd';
import dateFnsGenerateConfig from 'rc-picker/lib/generate/dateFns';

export const MyDatePicker = DatePicker.generatePicker<Date>(
  dateFnsGenerateConfig,
);
