import { useUserState } from '@/context/UserProvider';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';

export default function UserGuard() {
  const { user } = useUserState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
  }, []);

  if (!user) return <></>;
  return <Outlet />;
}
