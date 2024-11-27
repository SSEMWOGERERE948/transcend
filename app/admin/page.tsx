"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Product, getProducts } from '@/lib/products';
import { AdminProductList } from '@/components/admin/product-list';
import { AdminProductForm } from '@/components/admin/product-form';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAdmin) {
      router.push('/');
      return;
    }

    const loadProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [isAdmin, router]);

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <Tabs defaultValue="products" className="space-y-4">
        <TabsList>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="add">Add Product</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          {isLoading ? (
            <div className="text-center py-8">Loading products...</div>
          ) : (
            <AdminProductList products={products} setProducts={setProducts} />
          )}
        </TabsContent>

        <TabsContent value="add">
          <AdminProductForm
            onSuccess={(newProduct) => {
              setProducts([...products, newProduct]);
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}