import type { FC } from 'react';
import type { Column } from './ui-components/table/types.ts';
import type { User } from '../interfaces/user.interface.ts';
import Table from './ui-components/table/table.tsx';

interface UserTableProps {
  users: User[];
  loading: boolean;
  error: string | null;
  onUserSelect: (user: User) => void;
  onRefetch: () => void;
}

const UserTable: FC<UserTableProps> = ({
  users,
  loading,
  error,
  onRefetch,
  onUserSelect,
}) => {
  const columns: Column<User>[] = [
    {
      key: 'name',
      header: 'Name & Email',
      width: '25%',
      sortable: true,
      render: (user) => (
        <div>
          <div className="text-sm font-medium text-gray-900">{user.name}</div>
          <div className="text-sm text-gray-500">{user.email}</div>
        </div>
      ),
    },
    {
      key: 'address',
      header: 'Address',
      width: '25%',
      sortable: true,
      render: (user) => (
        <div>
          <div className="text-sm text-gray-900">
            {user.address.street}, {user.address.suite}
          </div>
          <div className="text-sm text-gray-500">
            {user.address.city}, {user.address.zipcode}
          </div>
        </div>
      ),
    },
    {
      key: 'phone',
      header: 'Phone',
      width: '15%',
      sortable: true,
      render: (user) => (
        <a
          href={`tel:${user.phone}`}
          className="text-sm text-blue-600 transition-colors hover:text-blue-800"
          onClick={(e) => e.stopPropagation()}
        >
          {user.phone}
        </a>
      ),
    },
    {
      key: 'website',
      header: 'Website',
      width: '15%',
      sortable: true,
      render: (user) => (
        <a
          href={`https://${user.website}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 transition-colors hover:text-blue-800"
          onClick={(e) => e.stopPropagation()}
        >
          {user.website}
        </a>
      ),
    },
    {
      key: 'company.name',
      header: 'Company',
      width: '15%',
      sortable: true,
      render: (user) => (
        <span className="text-sm text-gray-900">{user.company.name}</span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      width: '5%',
      render: (user) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onUserSelect(user);
          }}
          className="rounded-md bg-blue-600 px-3 py-1 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
          aria-label={`View details for ${user.name}`}
        >
          Details
        </button>
      ),
    },
  ];

  const handleError = () => {
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
            <h3 className="mb-2 text-lg font-semibold text-red-800">
              Error Loading Users
            </h3>
            <p className="mb-4 text-red-600">{error}</p>
            <button
              onClick={onRefetch}
              className="rounded-md bg-red-600 px-4 py-2 font-medium text-white transition-colors hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }
    return null;
  };

  if (error) {
    return handleError();
  }

  return (
    <div>
      <div className="rounded-t-xl bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <h2 className="text-2xl font-bold">User Directory</h2>
        <p className="mt-1 text-blue-100">Manage and view user information</p>
      </div>

      <Table
        data={users}
        columns={columns}
        loading={loading}
        error={error}
        emptyMessage="No users found"
        onRowClick={onUserSelect}
        responsive={true}
        striped={true}
        hoverable={true}
        className="rounded-t-none"
      />
    </div>
  );
};

export default UserTable;
