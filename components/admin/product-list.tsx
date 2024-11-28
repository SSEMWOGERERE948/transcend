"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Product, deleteProduct } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { AdminProductForm } from './product-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Pencil, Trash2 } from 'lucide-react';

interface AdminProductListProps {
  products: Product[];
  setProducts: (products: Product[]) => void;
}

export function AdminProductList({ products, setProducts }: AdminProductListProps) {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleDelete = async (product: Product) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(product.id, product.imageUrl);
        setProducts(products.filter((p) => p.id !== product.id));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product.id}>
          <CardHeader>
            <div className="relative aspect-square mb-4">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <CardTitle>{product.name}</CardTitle>
            <CardDescription>ugx{product.price}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">{product.description}</p>
            <div className="flex space-x-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center"
                    onClick={() => setEditingProduct(product)}
                  >
                    <Pencil className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Product</DialogTitle>
                    <DialogDescription>
                      Make changes to the product details below.
                    </DialogDescription>
                  </DialogHeader>
                  {editingProduct && (
                    <AdminProductForm
                      product={editingProduct}
                      onSuccess={(updatedProduct) => {
                        setProducts(
                          products.map((p) =>
                            p.id === updatedProduct.id ? updatedProduct : p
                          )
                        );
                        setEditingProduct(null);
                      }}
                    />
                  )}
                </DialogContent>
              </Dialog>
              <Button
                variant="destructive"
                size="sm"
                className="flex items-center"
                onClick={() => handleDelete(product)}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}