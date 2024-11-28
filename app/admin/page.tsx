"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/auth-context';
import { Product, getProducts } from '@/lib/products';
import { AdminProductList } from '@/components/admin/product-list';
import { AdminProductForm } from '@/components/admin/product-form';
import { Button } from '@/components/ui/button';
import { Plus, Package, PlusCircle } from 'lucide-react';
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-12 px-4 sm:px-6 lg:px-8"
    >
      <h1 className="text-4xl font-bold mb-8 text-purple-800">Admin Dashboard</h1>
      
      <Tabs defaultValue="products" className="space-y-8">
        <TabsList className="bg-purple-100 p-1 rounded-lg">
          <TabsTrigger value="products" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <Package className="w-5 h-5 mr-2" />
            Products
          </TabsTrigger>
          <TabsTrigger value="add" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <PlusCircle className="w-5 h-5 mr-2" />
            Add Product
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-8"
            >
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600 mx-auto"></div>
              <p className="mt-4 text-purple-600 font-semibold">Loading products...</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <AdminProductList products={products} setProducts={setProducts} />
            </motion.div>
          )}
        </TabsContent>

        <TabsContent value="add">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AdminProductForm
              onSuccess={(newProduct) => {
                setProducts([...products, newProduct]);
              }}
            />
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
