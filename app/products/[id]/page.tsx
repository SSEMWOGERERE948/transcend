"use client"

import ProductDetail from '@/components/ProductDetail';
import { getProducts, Product } from '@/lib/products';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const {id} = useParams();
  const [product, setProduct] = useState<Product>();



  useEffect(() => {
    ( async () => {
      try {
        let res = await getProducts();
        setProduct(res.filter(prod => prod.id == id)[0]);  
      }catch {
      }
    })()

  },[])

  return product !==  undefined  && <ProductDetail initialProduct={product} />;
}