import useUsers from './hooks/useUsers.ts';
import Header from './components/ui-components/header.tsx';

function App() {
  const { users, loading, refetch } = useUsers();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header usersCount={users.length} loading={loading} onRefetch={refetch} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"></main>
    </div>
  );
}

export default App;
