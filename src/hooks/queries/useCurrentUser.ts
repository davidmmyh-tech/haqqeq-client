import { CURRENT_USER_QUERY_KEY } from '@/constants/query-keys';
import { getToken } from '@/lib/token';
import type { User } from '@/schemas/types';
import { getCurrenytUser } from '@/services/auth';
import { useQuery } from '@tanstack/react-query';

type Props = {
  onSuccess?: (data: User) => void;
};

export default function useCurrentUserQuery({ onSuccess }: Props) {
  return useQuery({
    queryKey: [CURRENT_USER_QUERY_KEY],
    queryFn: () =>
      getCurrenytUser().then((data) => {
        onSuccess?.(data);
        return null;
      }),

    retry: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    enabled: () => !!getToken()
  });
}
