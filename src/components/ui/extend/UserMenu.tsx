import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { User as UserIcon } from 'lucide-react';
import { Link } from 'react-router';
import { toast } from 'react-toastify';
import { logoutUser } from '@/services/auth';
import SubmitButton from '../submit-button';
import { useUserState } from '@/context/UserProvider';
import { useMutation } from '@tanstack/react-query';

export default function UserMenu() {
  const { setUser } = useUserState();
  const { isPending, mutate } = useMutation({
    mutationKey: ['register'],
    mutationFn: logoutUser,
    onSuccess: () => {
      setUser(null);
      toast.warn('تم تسجيل الخروج');
    },
    onError: () => toast.error('فشل تسجيل الخروج')
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="link" className="text-foreground h-7 w-7 bg-gray-200 p-0">
          <UserIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-0 text-center" align="end">
        <Link to="/الملف-الشخصي" className="hover:bg-muted/10 block w-full justify-start border-b-2 py-2">
          الملف الشخصي
        </Link>
        <SubmitButton
          isLoading={isPending}
          variant="ghost"
          className="text-destructive hover:bg-destructive/10 hover:text-destructive h-auto w-full rounded-none bg-transparent p-0 py-2"
          onClick={() => mutate()}
        >
          تسجيل الخروج
        </SubmitButton>
      </PopoverContent>
    </Popover>
  );
}
