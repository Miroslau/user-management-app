import React, { useCallback, useMemo, useState } from 'react';
import type { Column, SortConfig, TableProps } from './types.ts';

const Table = <T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  error = null,
  emptyMessage = 'No data available',
  onRowClick,
  className = '',
  responsive = true,
  striped = true,
  hoverable = true,
}: TableProps<T>) => {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const getNestedValue = useCallback((obj: T, key: string) => {
    return key.split('.').reduce((value, k: string) => {
      return value[k];
    }, obj);
  }, []);

  const renderCellValue = useCallback(
    (item: T, column: Column<T>, index: number): any => {
      if (column.render) {
        return column.render(item, index);
      }
      return getNestedValue(item, String(column.key));
    },
    [getNestedValue]
  );

  const sortedData = useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const aValue = getNestedValue(a, sortConfig.key);
      const bValue = getNestedValue(b, sortConfig.key);

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }

      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }

      return 0;
    });
  }, [data, sortConfig, getNestedValue]);

  const handleSort = useCallback(
    (column: Column<T>): void => {
      if (!column.sortable) return;

      const key = String(column.key);
      let direction: 'asc' | 'desc' = 'asc';

      if (
        sortConfig &&
        sortConfig.key === key &&
        sortConfig.direction === 'asc'
      ) {
        direction = 'desc';
      }

      setSortConfig({ key, direction });
    },
    [sortConfig]
  );

  const handleRowClick = useCallback(
    (item: T, index: number) => {
      if (onRowClick) {
        onRowClick(item, index);
      }
    },
    [onRowClick]
  );

  const handleRowKeyDown = useCallback(
    (e: React.KeyboardEvent, item: T, index: number) => {
      if ((e.key === 'Enter' || e.key === ' ') && onRowClick) {
        e.preventDefault();
        onRowClick(item, index);
      }
    },
    [onRowClick]
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 text-center">
        <div className="mx-auto max-w-md rounded-lg border border-red-200 bg-red-50 p-6">
          <svg
            className="mx-auto mb-4 h-12 w-12 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mb-2 text-lg font-semibold text-red-800">Error</h3>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (sortedData.length === 0) {
    return (
      <div className="py-12 text-center">
        <svg
          className="mx-auto mb-4 h-16 w-16 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3 className="text-lg font-semibold text-gray-500">No Data</h3>
        <p className="text-gray-400">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div
      className={`overflow-hidden rounded-xl bg-white shadow-lg ${className}`}
    >
      <div className={`${responsive ? 'hidden lg:block' : ''} overflow-x-auto`}>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={String(column.key) + index}
                  className={`px-6 py-4 text-left text-xs font-medium tracking-wider text-gray-500 uppercase ${
                    column.sortable
                      ? 'cursor-pointer select-none hover:bg-gray-100'
                      : ''
                  } ${column.headerClassName || ''}`}
                  style={{ width: column.width }}
                  onClick={() => handleSort(column)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSort(column);
                    }
                  }}
                  tabIndex={column.sortable ? 0 : -1}
                  role={column.sortable ? 'button' : undefined}
                  aria-label={
                    column.sortable ? `Sort by ${column.header}` : undefined
                  }
                >
                  <div className="flex items-center">
                    {column.header}
                    {column.sortable && (
                      <span className="ml-2">
                        {sortConfig?.key === String(column.key) ? (
                          sortConfig.direction === 'asc' ? (
                            <svg
                              className="h-4 w-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="h-4 w-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )
                        ) : (
                          <svg
                            className="h-4 w-4 text-gray-300"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody
            className={`bg-white ${striped ? 'divide-y divide-gray-200' : ''}`}
          >
            {sortedData.map((item, index) => (
              <tr
                key={index}
                className={` ${hoverable ? 'hover:bg-gray-50' : ''} ${striped && index % 2 === 1 ? 'bg-gray-25' : ''} ${onRowClick ? 'cursor-pointer' : ''} transition-colors`}
                onClick={() => handleRowClick(item, index)}
                onKeyDown={(e) => handleRowKeyDown(e, item, index)}
                tabIndex={onRowClick ? 0 : -1}
                role={onRowClick ? 'button' : undefined}
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={String(column.key) + colIndex}
                    className={`px-6 py-4 whitespace-nowrap ${column.className || ''}`}
                  >
                    {renderCellValue(item, column, index)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {responsive && (
        <div className="space-y-4 p-4 lg:hidden">
          {sortedData.map((item, index) => (
            <div
              key={index}
              className={`rounded-lg border border-gray-200 bg-gray-50 p-4 ${
                onRowClick ? 'cursor-pointer hover:bg-gray-100' : ''
              } transition-colors`}
              onClick={() => handleRowClick(item, index)}
              onKeyDown={(e) => handleRowKeyDown(e, item, index)}
              tabIndex={onRowClick ? 0 : -1}
              role={onRowClick ? 'button' : undefined}
            >
              {columns.map((column, colIndex) => (
                <div
                  key={String(column.key) + colIndex}
                  className="mb-2 last:mb-0"
                >
                  <span className="text-sm font-medium text-gray-600">
                    {column.header}:
                  </span>
                  <span className="ml-2 text-sm text-gray-900">
                    {renderCellValue(item, column, index)}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Table;
