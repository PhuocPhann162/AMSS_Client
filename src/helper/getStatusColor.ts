import { SD_FieldStatus } from '~/utils/SD';

const getStatusColor = (status: string) => {
  switch (status) {
    case SD_FieldStatus.IDLE.toString():
      return 'default';
    case SD_FieldStatus.PLANTED.toString():
      return 'green';
    case SD_FieldStatus.NEEDS_CARE.toString():
      return 'processing';
    case SD_FieldStatus.AWAITING_HARVEST.toString():
      return 'yellow';
    case SD_FieldStatus.HARVESTING.toString():
      return 'brown';
    case SD_FieldStatus.RECOVERY_NEEDED.toString():
      return 'red';
    default:
      return undefined;
  }
};

export default getStatusColor;
