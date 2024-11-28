import ProductDetail from '@/components/ProductDetail';
import { getProducts } from '@/lib/products';

export default async function Page({ params }: { params: { id: string } }) {
  const products = await getProducts();
  const product = products.find(prod => prod.id === params.id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return <ProductDetail initialProduct={product} />;
}