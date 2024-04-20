import { SD_FieldStatus } from '~/utils/SD';

const getStatusColor = (status: SD_FieldStatus) => {
  console.log(status);

  switch (status) {
    case SD_FieldStatus.IDLE.toString():
      return 'status-white';
    case SD_FieldStatus.PLANTED.toString():
      return 'status-success';
    case SD_FieldStatus.NEEDS_CARE.toString():
      return 'status-info';
    case SD_FieldStatus.AWAITING_HARVEST.toString():
      return 'status-warning';
    case SD_FieldStatus.HARVESTING.toString():
      return 'status-accent';
    case SD_FieldStatus.RECOVERY_NEEDED.toString():
      return 'status-danger';
    default:
      // Mặc định trả về một màu nào đó khi trạng thái không khớp
      return { dark: '#000000', light: '#ffffff' };
  }
};

export default getStatusColor;
