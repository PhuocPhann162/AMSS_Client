import { SD_FieldStatus } from '~/utils/SD';

const getStatusColor = (status: string) => {
  return status === SD_FieldStatus.IDLE
    ? 'status-white'
    : status === SD_FieldStatus.PLANTED
      ? 'status-accent'
      : status === SD_FieldStatus.NEEDS_CARE
        ? 'status-info'
        : status === SD_FieldStatus.AWAITING_HARVEST
          ? 'status-warning'
          : status === SD_FieldStatus.HARVESTING
            ? 'status-success'
            : status === SD_FieldStatus.RECOVERY_NEEDED && 'status-danger';
};

export default getStatusColor;
