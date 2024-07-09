import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { loginSteps } from '@/constants/modal';
import { loginSchema } from '@/lib/schema/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import ModalContent from '../layout/ModalContent';
import { LoginStep } from './LoginModal';
import PasswordInput from '@/components/input/PasswordInput';

const Step2 = ({
  setLoginStep,
}: {
  setLoginStep: React.Dispatch<React.SetStateAction<LoginStep>>;
}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const res = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    console.log(res, 'res');

    if (res?.ok) {
      console.log('OK');
      router.back();
      toast({
        variant: 'success',
        title: 'Login Successful',
        description: 'You have successfully logged in. Welcome back!',
      });
    }

    if (res?.error) {
      toast({
        variant: 'error',
        title: 'Login Error',
        description:
          'There was an error logging in. Please check your credentials and try again.',
      });
    }
  }

  const handlePreviousStep = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    setLoginStep(loginSteps[0]);
  };

  const handleForgotPassword = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    setLoginStep(loginSteps[2]);
  };

  return (
    <ModalContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='Enter email address' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput 
                    placeholder='Enter Password'
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='pt-6 flex flex-row-reverse  gap-2 items-center'>
            <Button className='flex-1 order-1'>Login</Button>
            <Button
              variant='secondary'
              className='flex-1 order-2'
              onClick={handlePreviousStep}
            >
              Previous
            </Button>
          </div>
        </form>

        <div className='pt-2 text-right font-jost text-sm'>
          <Link
            href='#'
            className='text-primary-monkeyOrange'
            onClick={handleForgotPassword}
          >
            Forgot Password
          </Link>
        </div>
      </Form>
    </ModalContent>
  );
};

export default Step2;
