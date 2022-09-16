export interface MetaProps {
  keepAlive?: boolean;
  requiresAuth?: boolean;
  title: string;
  key?: string;
}

export interface RouteObject {
  caseSensitive?: boolean; // 属性用于指定：匹配时是否区分大小写（默认为false）
  children?: RouteObject[];
  element?: React.ReactNode;
  index?: boolean;
  path?: string;
  meta?: MetaProps;
  isLink?: string;
}