'use client';

import { ContributeAndSponsorCard } from '@/components/branding/sponsor/ContributeAndSponsorCard';
import { useSession } from 'next-auth/react';

import { LatestBlogs } from './LatestBlogs';

export const BlogFeed = () => {
  const { status } = useSession();

  return (
    <div className='mt-6 md:mt-8 grid grid-cols-3 gap-6'>
      <div className='col-span-3 md:col-span-2'>
        <LatestBlogs status={status} />
      </div>

      <div className='hidden md:block col-span-3 md:col-span-1'>
        <ContributeAndSponsorCard />
      </div>
    </div>
  );
};
