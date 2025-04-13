/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetProp, TableProps } from 'antd';
import { SorterResult } from 'antd/es/table/interface';
import { ReactElement } from 'react';

export type TablePaginationConfig = Exclude<
  GetProp<TableProps, 'pagination'>,
  boolean
>;

export type ExtraAction = {
  element: ReactElement;
};

export interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<any>['field'];
  sortOrder?: SorterResult<any>['order'];
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
  extraAction?: ExtraAction[];
}
