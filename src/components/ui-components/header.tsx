import type { FC } from 'react';

interface HeaderProps {
  usersCount: number;
  loading: boolean;
  onRefetch: () => void;
}

const Header: FC<HeaderProps> = ({ usersCount, loading, onRefetch }) => {
  return (
    <header className="border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              User Management Dashboard
            </h1>
            <p className="mt-1 text-gray-600">
              Manage and view user information from JSONPlaceholder API
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
              {usersCount} Users
            </div>
            <button
              onClick={onRefetch}
              disabled={loading}
              className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Refresh user data"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                  Loading...
                </div>
              ) : (
                <div className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Refresh
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
