import type { ReactNode } from 'react';

export interface Column<T> {
  key: keyof T | string;
  header: string;
  width?: string;
  sortable?: boolean;
  render?: (item: T, index: number) => ReactNode;
  className?: string;
  headerClassName?: string;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  error?: string | null;
  emptyMessage?: string;
  onRowClick?: (item: T, index: number) => void;
  className?: string;
  responsive?: boolean;
  striped?: boolean;
  hoverable?: boolean;
}

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}
