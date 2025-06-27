import type { User } from '../interfaces/user.interface.ts';
import { useEffect, useState } from 'react';

interface UseUsersReturn {
  users: User[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const useUSers = (): UseUsersReturn => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: User[] = await response.json();
      setUsers(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to fetch users';
      setError(errorMessage);
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, error, refetch };
};

export default useUSers;
