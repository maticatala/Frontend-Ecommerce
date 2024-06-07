export interface Column {
  id: string;
  pipe?: string;
  visible?: boolean;
  label: string;
  breakpoint: Breakpoint;
  width?: number;
}

export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | 'static';
