import { type ReactNode } from 'react';

export interface Route {
  name: string;
  path: string;
  hidden?: boolean;
  element?: ReactNode;
  protected?: boolean;
  children?: Route[];
}
