'use client';

import React, { Suspense, useCallback, useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

import { EditorProps } from '@/components/editor';
import { Loader } from '@/components/loader';
import PublishModal from '@/components/modals/publish/PublishModal';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { getEditorConfig } from '@/config/editor/editorjs.config';
import { WSS_URL_V2 } from '@/constants/api';
import useGetDraftBlogDetail from '@/hooks/blog/useGetDraftBlogDetail';
import axiosInstance from '@/services/api/axiosInstance';
import { OutputData } from '@editorjs/editorjs';
import { useSession } from 'next-auth/react';
import { mutate } from 'swr';

// Dynamically import the Editor component to avoid server-side rendering issues
const Editor = dynamic(() => import('@/components/editor'), {
  ssr: false,
});

const initial_data = {
  time: new Date().getTime(),
  blocks: [],
};

const EditPage = ({ params }: { params: { blogId: string } }) => {
  const [editor, setEditor] = useState<React.FC<EditorProps> | null>(null);
  const [data, setData] = useState<OutputData | null>(null);
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [blogPublishLoading, setBlogPublishLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { data: session } = useSession();
  const router = useRouter();
  const blogId = params.blogId;

  const { blog, isLoading } = useGetDraftBlogDetail(blogId);

  // Function to create and manage WebSocket connection
  const createWebSocket = useCallback((blogId: string, token: string) => {
    const ws = new WebSocket(
      `${WSS_URL_V2}/blog/draft/${blogId}?token=${token}`
    );

    ws.onopen = () => {
      console.log('WebSocket connection opened');
    };

    ws.onmessage = (event) => {
      console.log('WebSocket message received');
      setIsSaving(false); // Reset saving status when message is received
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    setWebSocket(ws);

    // Cleanup function to close the WebSocket connection
    return () => {
      ws.close();
    };
  }, []);

  // Function to format data before sending it to the server
  const formatData = useCallback(
    (data: OutputData, accountId: string | undefined) => {
      return {
        owner_account_id: accountId,
        author_list: [accountId],
        content_type: 'editorjs',
        blog: {
          time: data.time,
          blocks: data.blocks.map((block) => ({
            ...block,
            author: [accountId],
            time: new Date().getTime(),
          })),
        },
        tags: selectedTags,
      };
    },
    [selectedTags]
  );

  // Load the Editor component dynamically
  useEffect(() => {
    const loadEditor = async () => {
      const editor = await import('@/components/editor');
      setEditor(() => editor.default);
    };

    loadEditor();
  }, []);

  // Fetch draft blog data every time the page loads
  useEffect(() => {
    mutate(`/blog/my-drafts/${blogId}`, blogId, { revalidate: true });
  }, [mutate]);

  // Create WebSocket connection when authToken is available
  useEffect(() => {
    if (session?.user.token) {
      const cleanup = createWebSocket(blogId, session.user.token);

      // Listen for beforeunload event to close the WebSocket connection
      const handleBeforeUnload = () => {
        cleanup();
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        cleanup();
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [session?.user.token, blogId, createWebSocket]);

  // Set editor data based on the source
  useEffect(() => {
    if (blog) {
      setData(blog.blog);
    }
  }, [blog]);

  // Send data to WebSocket when data changes
  useEffect(() => {
    if (webSocket && webSocket.readyState === WebSocket.OPEN && data) {
      const formattedData = formatData(data, session?.user.account_id);
      webSocket.send(JSON.stringify(formattedData));
      setIsSaving(true); // Set saving status when data is sent
    }
  }, [data, webSocket, session?.user.account_id, formatData]);

  // Handle the publish action
  const handlePublishStep = useCallback(async () => {
    if (!data || data.blocks.length === 0) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Blog content cannot be empty.',
      });
      return; // Ensure data is not null and not empty
    }

    const formattedData = formatData(data, session?.user.account_id);

    setBlogPublishLoading(true);

    try {
      await axiosInstance.post(`/blog/publish/${blogId}`, formattedData);
      toast({
        variant: 'success',
        title: 'Blog Published successfully',
        description: 'Your blog has been published successfully!',
      });
      setBlogPublishLoading(false);
      router.push(`/${session?.user?.username}`);
    } catch (err) {
      console.error(err); // Optional: Log the error for debugging purposes
      toast({
        variant: 'destructive',
        title: 'Error publishing blog',
        description:
          'There was an error while publishing your blog. Please try again.',
      });
    } finally {
      setBlogPublishLoading(false);
    }
  }, [data, session?.user.account_id, blogId, formatData, router]);

  return (
    <>
      {isLoading ? (
        <Loader className='mx-auto' />
      ) : (
        <div className='space-y-4'>
          <div className='mx-auto w-full sm:w-4/5 flex justify-between items-center sm:items-end'>
            {isSaving ? (
              <p className='text-xs sm:text-sm opacity-80'>Saving ...</p>
            ) : (
              <p className='text-xs sm:text-sm opacity-80'>Saved</p>
            )}

            <Button onClick={() => setShowModal(true)}>Publish</Button>
          </div>

          <Suspense fallback={<Loader />}>
            {editor && data && (
              <Editor
                data={data}
                onChange={setData}
                config={getEditorConfig(blogId)}
              />
            )}
          </Suspense>

          {showModal && (
            <PublishModal
              setModal={setShowModal}
              setSelectedTags={setSelectedTags}
              blogId={blogId}
              handlePublishStep={handlePublishStep}
              publishedBlogLoading={blogPublishLoading}
            />
          )}
        </div>
      )}
    </>
  );
};

export default EditPage;
