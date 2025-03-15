export interface Route {
  title: string;
  path: string;
  icon: React.ReactNode;
  children?: Route[];
}
