import { CommodityStatus } from '@/interfaces';
import { SD_FieldStatus } from '@/utils/SD';

export const getStatusColor = (status: string) => {
  switch (status) {
    case SD_FieldStatus.IDLE.toString():
      return 'green';
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

export const getCommodityStatusColor = (status: CommodityStatus) => {
  switch (status) {
    case CommodityStatus.Active:
      return 'green';
    case CommodityStatus.ComingSoon:
      return 'gold';
    case CommodityStatus.Discontinued:
      return 'volcano';
    case CommodityStatus.Limited:
      return 'cyan';
    case CommodityStatus.OutOfStock:
      return 'red';
    case CommodityStatus.PreOrder:
      return 'magenta';
    default:
      return undefined;
  }
};
