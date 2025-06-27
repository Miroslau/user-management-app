import useUsers from './hooks/useUsers.ts';
import Header from './components/ui-components/header.tsx';
import UserTable from './components/user-table.tsx';
import type { User } from './interfaces/user.interface.ts';
import UserModal from './components/user-modal.tsx';
import { useState } from 'react';

function App() {
  const { users, loading, refetch, error } = useUsers();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header usersCount={users.length} loading={loading} onRefetch={refetch} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <UserTable
          users={users}
          loading={loading}
          error={error}
          onUserSelect={handleUserSelect}
          onRefetch={refetch}
        />
      </main>

      <UserModal
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      <footer className="mt-12 border-t border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-500">
            <p>Built with React, TypeScript, and Tailwind CSS</p>
            <p className="mt-1">Data provided by JSONPlaceholder API</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
