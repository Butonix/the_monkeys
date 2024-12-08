import { Metadata } from 'next';

import Container from '@/components/layout/Container';
import {
  PageHeader,
  PageHeading,
  PageSubheading,
} from '@/components/layout/pageHeading';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Account } from './components/Account';
import { Profile } from './components/Profile';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Settings',
  };
}

const SettingsPage = () => {
  return (
    <Container className='pb-12 space-y-4 md:space-y-6'>
      <PageHeader>
        <PageHeading heading='Settings' className='py-1 self-start' />
        <PageSubheading
          subheading='Customize your experience and manage your account settings.'
          className='self-start opacity-80'
        />
      </PageHeader>

      <Tabs
        defaultValue='profile'
        className='px-4 grid grid-cols-4 gap-4 md:gap-6'
      >
        <div className='col-span-4 md:col-span-1 flex flex-col'>
          <TabsList className='p-3 font-dm_sans flex md:flex-col justify-evenly flex-wrap items-start gap-4 md:gap-3'>
            <TabsTrigger
              value='profile'
              className='md:w-full flex flex-row justify-start gap-2 opacity-80 data-[state=active]:opacity-100 hover:opacity-100'
            >
              <p className='font-dm_sans'>Profile</p>

              <div className='size-2 rounded-full bg-transparent group-data-[state=active]:bg-brand-orange'></div>
            </TabsTrigger>

            <TabsTrigger
              value='account'
              className='md:w-full flex flex-row justify-start gap-2 opacity-80 data-[state=active]:opacity-100 hover:opacity-100'
            >
              <p className='font-dm_sans'>Account</p>

              <div className='size-2 rounded-full bg-transparent group-data-[state=active]:bg-brand-orange'></div>
            </TabsTrigger>

            <TabsTrigger
              value='security'
              className='md:w-full flex flex-row justify-start gap-2 opacity-80 data-[state=active]:opacity-100 hover:opacity-100'
            >
              <p className='font-dm_sans'>Security</p>

              <div className='size-2 rounded-full bg-transparent group-data-[state=active]:bg-brand-orange'></div>
            </TabsTrigger>

            <TabsTrigger
              value='notifications'
              className='md:w-full flex flex-row justify-start gap-2 opacity-80 data-[state=active]:opacity-100 hover:opacity-100'
            >
              <p className='font-dm_sans'>Notifications</p>

              <div className='size-2 rounded-full bg-transparent group-data-[state=active]:bg-brand-orange'></div>
            </TabsTrigger>
          </TabsList>
        </div>

        <div className='col-span-4 md:col-span-3'>
          <TabsContent className='min-h-screen' value='profile'>
            <Profile />
          </TabsContent>

          <TabsContent className='min-h-screen w-full' value='account'>
            <Account />
          </TabsContent>

          <TabsContent className='min-h-screen w-full' value='security'>
            <p className='py-1 font-roboto text-center opacity-80'>
              Security settings will be available soon.
            </p>
          </TabsContent>

          <TabsContent className='min-h-screen w-full' value='notifications'>
            <p className='py-1 font-roboto text-center opacity-80'>
              Notification settings will be available soon.
            </p>
          </TabsContent>
        </div>
      </Tabs>
    </Container>
  );
};

export default SettingsPage;
