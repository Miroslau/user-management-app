import useUsers from './hooks/useUsers.ts';
import Header from './components/ui-components/header.tsx';
import UserTable from './components/user-table.tsx';
import type { User } from './interfaces/user.interface.ts';

function App() {
  const { users, loading, refetch, error } = useUsers();
  const handleUserSelect = (user: User) => {
    console.log('user: ', user);
    //setSelectedUser(user);
    //setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    //setIsModalOpen(false);
    //setSelectedUser(null);
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
    </div>
  );
}

export default App;
