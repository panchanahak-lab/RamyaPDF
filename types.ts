
export enum ToolType {
  EDIT = 'Edit PDF',
  CONVERT = 'Convert PDF',
  MERGE = 'Merge PDF',
  SPLIT = 'Split PDF',
  COMPRESS = 'Compress PDF',
  OCR = 'OCR to Text',
  SIGN = 'Sign PDF',
  PROTECT = 'Protect PDF'
}

export interface UserFile {
  id: string;
  name: string;
  size: string;
  uploadedAt: Date;
  type: string;
  status: 'ready' | 'processing' | 'completed';
}

export interface User {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'premium';
  avatar: string;
}

export interface Annotation {
  id: string;
  type: 'text' | 'draw' | 'comment';
  page: number;
  x: number;
  y: number;
  content: string;
  author: string;
}
