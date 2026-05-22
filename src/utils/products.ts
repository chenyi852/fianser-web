import { getCollection, type CollectionEntry } from 'astro:content';

export type Product = CollectionEntry<'products'>;

export async function getAllProducts(): Promise<Product[]> {
  const products = await getCollection('products');
  return products.sort((a, b) => a.data.sortOrder - b.data.sortOrder);
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter((p) => p.data.category === category);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter((p) => p.data.featured);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getAllProducts();
  return products.find((p) => p.data.slug === slug);
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    swimwear: 'Swimwear',
    bracelet: 'Bracelet',
    agarwood: 'Agarwood',
  };
  return labels[category] || category;
}
