'use client';

import { useState } from 'react';

import Icon from '@/components/icon';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Category } from '@/services/category/categoryTypes';

import TopicForm from './AddTopicForm';

export const AddTopicForm = ({
  categories,
  categoriesLoading,
}: {
  categoriesLoading: boolean;
  categories:
    | {
        [key: string]: Category;
      }
    | {};
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button variant='outline' className='rounded-full'>
          <p>Create Topic</p>
          <Icon name='RiAdd' size={18} className='ml-2' />
        </Button>
      </DialogTrigger>

      <DialogContent aria-describedby='Topic-Dialog'>
        <DialogTitle>Add Topic</DialogTitle>
        {/* Todo
        Create a form with following inputs:
        1. Topic name (input box)
        2. Category name (select menu) */}
        <TopicForm
          onSuccess={closeDialog}
          categoriesData={categories}
          isCategoriesLoading={categoriesLoading}
        />
      </DialogContent>
    </Dialog>
  );
};
