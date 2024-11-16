import { API_URL } from '@/constants/api';
import { EditorConfig } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Image from '@editorjs/image';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';
import axios from 'axios';
import { getSession } from 'next-auth/react';

export const getEditorConfig = (blogId: string): EditorConfig => ({
  holder: 'editorjs_editor-container',
  tools: {
    header: {
      class: Header,
      inlineToolbar: true,
      config: {
        levels: [1, 2],
        defaultLevel: 1,
      },
    },
    paragraph: {
      class: Paragraph,
      inlineToolbar: true,
      config: {
        placeholder: 'pen your thoughts ...',
      },
    },
    list: {
      class: List,
      inlineToolbar: true,
      config: {
        defaultStyle: 'unordered',
      },
    },

    image: {
      class: Image,
      config: {
        uploader: {
          async uploadByFile(file: File) {
            const session = await getSession();
            const token = session?.user.token;

            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post(
              `${API_URL}/files/post/${blogId}?token=${token}`,
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              }
            );

            return {
              success: 1,
              file: {
                url: `https://dev.themonkeys.site/api/v1/files/post/${blogId}/${response.data.new_file_name}`,
              },
            };
          },
        },
      },
    },
  },
  defaultBlock: 'paragraph',
});