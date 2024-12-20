import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Icon from '@/components/icon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/use-toast';
import { signOut, useSession } from 'next-auth/react';

const ProfileDropdown = () => {
  const { status, data } = useSession();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className='hover:opacity-80 cursor-pointer'>
          <Icon name='RiUser' size={22} />
        </div>
      </DropdownMenuTrigger>

      {status === 'unauthenticated' ? (
        <DropdownMenuContent className='m-2 w-44'>
          <DropdownMenuItem>
            <div
              onClick={() => {
                router.push('api/auth/signin');
              }}
              className='flex w-full items-center gap-2'
            >
              <Icon name='RiLoginBox' size={18} className='text-alert-green' />
              <p className='font-dm_sans text-sm sm:text-base'>Login</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent className='m-2 w-36 sm:w-44'>
          <DropdownMenuItem asChild>
            <Link
              href={`/${data?.user?.username}`}
              className='flex w-full items-center gap-2'
            >
              <Icon name='RiUser' size={18} />
              <p className='font-dm_sans text-sm sm:text-base'>Profile</p>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link href='/settings' className='flex w-full items-center gap-2'>
              <Icon name='RiSettings3' size={18} />
              <p className='font-dm_sans text-sm sm:text-base'>Settings</p>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link
              href={`/notifications`}
              className='flex w-full items-center gap-2'
            >
              <Icon name='RiNotification3' size={18} />
              <p className='font-dm_sans text-sm sm:text-base'>Notifications</p>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <div
              onClick={() => {
                signOut();
                toast({
                  variant: 'success',
                  title: ' Logout Successful',
                  description:
                    'You have successfully logged out. See you next time!',
                });
              }}
              className='flex w-full items-center gap-2'
            >
              <Icon name='RiLogoutBoxR' size={18} className='text-alert-red' />
              <p className='font-dm_sans text-sm sm:text-base'>Logout</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};

export default ProfileDropdown;
