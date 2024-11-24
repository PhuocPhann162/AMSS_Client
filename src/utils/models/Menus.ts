export interface MenusDTO {
  Directory: string;
  IsActive: boolean;
  KeyMenu: string;
  MenuLevel: number;
  MenuName: string;
  OrderBy: number;
  ChildrenRoute?: MenusDTO[];
}
