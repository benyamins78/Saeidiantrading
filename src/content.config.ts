import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    language: z.enum(['en', 'fa', 'ur']),
    date: z.date(),
    description: z.string(),
    image: z.string().optional(),
  })
});

export const collections = {
  'blog': blogCollection,
};