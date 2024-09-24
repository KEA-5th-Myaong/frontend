export interface IconPathTypes {
  path: string | string[];
  width: number;
  height: number;
  fill: string;
  options?: IconOptions;
}
export interface IconOptions {
  stroke?: string;
  strokeWidth?: number;
  strokeLinecap?: 'round' | 'butt' | 'square' | 'inherit';
  strokeLinejoin?: 'round' | 'bevel' | 'miter' | 'inherit';
  fillRule?: 'evenodd' | 'inherit' | 'nonzero';
  clipRule?: 'evenodd' | 'inherit' | 'nonzero';
}
export interface IconsSVGTypes {
  size: number;
  path: string;
  fill: string;
}
