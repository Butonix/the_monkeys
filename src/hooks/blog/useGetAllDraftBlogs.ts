import { GetDraftBlogResponse } from '@/services/blog/blogTypes';
import { authFetcher } from '@/services/fetcher';
import useSWR from 'swr';

const useGetAllDraftBlogs = (accountId: string | undefined) => {
  const { data, error, isLoading } = useSWR<GetDraftBlogResponse>(
    `/blog/all/drafts/${accountId}`,
    authFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    blogs: data,
    isError: error,
    isLoading,
  };
};

export default useGetAllDraftBlogs;
