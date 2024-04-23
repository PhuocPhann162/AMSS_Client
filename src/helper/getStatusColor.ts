import { SD_FieldStatus } from '~/utils/SD';

const getStatusColor = (status: SD_FieldStatus) => {
  switch (status) {
    case SD_FieldStatus.IDLE.toString():
      return 'white';
    case SD_FieldStatus.PLANTED.toString():
      return 'success';
    case SD_FieldStatus.NEEDS_CARE.toString():
      return 'info';
    case SD_FieldStatus.AWAITING_HARVEST.toString():
      return 'warning';
    case SD_FieldStatus.HARVESTING.toString():
      return 'accent';
    case SD_FieldStatus.RECOVERY_NEEDED.toString():
      return 'danger';
    default:
      // Mặc định trả về một màu nào đó khi trạng thái không khớp
      return { dark: '#000000', light: '#ffffff' };
  }
};

export default getStatusColor;
