// app/products/[id]/page.tsx
import { getProducts } from '@/lib/products';
import { notFound } from 'next/navigation';

// Ensure generateStaticParams is exported at the top level
export async function generateStaticParams() {
  try {
    const products = await getProducts();
    return products.map((product) => ({
      id: product.id.toString(),
    }));
  } catch (error) {
    console.error('Failed to generate static params:', error);
    return [];
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  try {
    const products = await getProducts();
    const product = products.find(p => p.id === params.id);

    if (!product) {
      notFound();
    }

    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-xl">${product.price.toFixed(2)}</p>
        <p>{product.description}</p>
      </div>
    );
  } catch (error) {
    console.error('Error loading product:', error);
    notFound();
  }
}