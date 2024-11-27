import { db } from './firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string; // Will store base64 image data
  category: string;
  inStock: boolean;
}

// Convert File to Base64 string
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

// Add a new product with an image
export async function addProduct(product: Omit<Product, 'id'>, imageFile: File) {
  try {
    const imageData = await fileToBase64(imageFile); // Convert image to base64 string

    // Add product to Firestore
    const docRef = await addDoc(collection(db, 'products'), {
      ...product,
      imageUrl: imageData, // Store base64 string in Firestore
      createdAt: new Date(),
    });

    return { id: docRef.id, ...product, imageUrl: imageData };
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
}

// Update an existing product, optionally updating its image
export async function updateProduct(
  productId: string, 
  updates: Partial<Product>, 
  newImageFile?: File
) {
  try {
    let imageUrl = updates.imageUrl;

    if (newImageFile) {
      imageUrl = await fileToBase64(newImageFile); // Convert new image file to base64
    }

    // Update product in Firestore
    const productRef = doc(db, 'products', productId);
    await updateDoc(productRef, {
      ...updates,
      imageUrl, // Update base64 string
      updatedAt: new Date(),
    });

    return { id: productId, ...updates, imageUrl };
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
}

// Delete a product
export async function deleteProduct(productId: string, imageUrl: string) {
  try {
    // Delete product from Firestore
    await deleteDoc(doc(db, 'products', productId));
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}

// Fetch all products
export async function getProducts(): Promise<Product[]> {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];
  } catch (error) {
    console.error('Error getting products:', error);
    throw error;
  }
}
