import type { Metadata } from 'next';

import { Tabs, TabsContent } from '@/components/ui/tabs';

import { Blogs } from './components/Blogs';
import { Drafts } from './components/Drafts';
import { NavigationTabs } from './components/NavigationTabs';

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}): Promise<Metadata> {
  const username = params.username;

  return {
    title: `@${username}`,
  };
}

const ProfilePage = ({ params }: { params: { username: string } }) => {
  return (
    <div>
      <Tabs defaultValue='blogs' className='space-y-6 md:space-y-8'>
        <NavigationTabs username={params.username} />

        <div className='w-full'>
          <TabsContent className='w-full' value='blogs'>
            <Blogs username={params.username} />
          </TabsContent>

          <TabsContent className='w-full' value='drafts'>
            <Drafts username={params.username} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
