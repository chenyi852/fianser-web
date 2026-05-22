import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    category: z.enum(['swimwear', 'bracelet', 'agarwood']),
    subtitle: z.string().optional(),
    price: z.string(),
    priceRange: z.string().optional(),
    images: z.array(z.string()),
    tags: z.array(z.string()).optional(),
    material: z.string().optional(),
    weight: z.string().optional(),
    size: z.string().optional(),
    origin: z.string().optional(),
    buyLink: z.string().url().optional(),
    featured: z.boolean().default(false),
    sortOrder: z.number().default(0),
  }),
});

export const collections = { products };
