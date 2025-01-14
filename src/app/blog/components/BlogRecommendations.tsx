import Link from 'next/link';

import { BlogRecommendationCard } from '@/components/blog/cards/BlogRecommendationCard';
import Icon from '@/components/icon';
import { Loader } from '@/components/loader';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CREATE_ROUTE } from '@/constants/routeConstants';
import useGetLatest100Blogs from '@/hooks/blog/useGetLatest100Blogs';

export const BlogRecommendations = ({ blogId }: { blogId: string }) => {
  const { blogs, isLoading, isError } = useGetLatest100Blogs();
  if (isLoading)
    return (
      <div className='pb-6 bg-foreground-light/50 dark:bg-foreground-dark/50 rounded-lg'>
        <h4 className='p-4 pb-2 font-dm_sans font-medium'>
          You might also like
        </h4>

        <Separator className='mb-4 bg-background-light dark:bg-background-dark' />

        <Loader className='mx-auto' />
      </div>
    );

  if (isError) return null;

  return (
    <div className='pb-6 bg-foreground-light/50 dark:bg-foreground-dark/50 rounded-lg'>
      <h4 className='p-4 pb-2 font-dm_sans font-medium'>You might also like</h4>

      <Separator className='mb-4 bg-background-light dark:bg-background-dark' />

      <div className='flex flex-col gap-6'>
        {blogs?.blogs.length ? (
          blogs?.blogs
            .filter((blog) => blog?.blog_id !== blogId)
            .slice(0, 5)
            .map((blog) => {
              return blog?.blog?.blocks.length < 5 ? null : (
                <BlogRecommendationCard key={blog?.blog_id} blog={blog} />
              );
            })
        ) : (
          <div className='py-2 flex flex-col items-center gap-4'>
            <p className='text-sm opacity-80 text-center'>
              No blogs available.
            </p>

            <Button size='sm' className='rounded-full ' asChild>
              <Link href={`${CREATE_ROUTE}`}>
                <Icon name='RiPencil' className='mr-1' />
                Write Your Own
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
