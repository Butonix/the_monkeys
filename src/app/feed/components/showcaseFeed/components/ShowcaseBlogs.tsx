import { ShowcaseBlogCard } from '@/components/blog/cards/ShowcaseBlogCard';
import LinksRedirectArrow from '@/components/links/LinksRedirectArrow';
import { ShowcaseBlogCardListSkeleton } from '@/components/skeletons/blogSkeleton';
import useGetLatest100Blogs from '@/hooks/blog/useGetLatest100Blogs';

export const ShowcaseBlogs = () => {
  const { blogs, isLoading, isError } = useGetLatest100Blogs();

  if (isLoading) return <ShowcaseBlogCardListSkeleton />;

  if (isError)
    return (
      <p className='w-full text-sm opacity-80 text-center'>
        Oops! Something went wrong. Please try again.
      </p>
    );

  const filteredBlogs = blogs?.blogs.filter((blog) => {
    if (!blog?.tags?.length) return false;

    if (blog?.blog?.blocks.length < 5) return false;

    return blog;
  });

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='font-dm_sans font-medium text-lg'>
          Latest Blogs on <span className='text-brand-orange'>Monkeys</span>
        </h1>

        <LinksRedirectArrow link='/feed?source=all' className='w-fit'>
          <p className='text-sm opacity-80'>explore all</p>
        </LinksRedirectArrow>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-3 gap-y-8 sm:gap-y-10 gap-x-6'>
        {filteredBlogs?.slice(0, 6)?.map((blog) => {
          return <ShowcaseBlogCard key={blog.blog_id} blog={blog} />;
        })}
      </div>
    </div>
  );
};