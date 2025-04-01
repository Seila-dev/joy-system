import { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import { parseCookies } from 'nookies';
import { toast } from 'sonner';
import { JoyStoreItem } from '../types/joyData';


type productContextType = {
  products: JoyStoreItem[] | null
  loading: boolean
  error: string | null
  addProduct: (newProduct: JoyStoreItem) => Promise<void>
  editProduct: (updatedProduct: JoyStoreItem) => Promise<void>
  deleteProduct: (productId: number) => Promise<void>
}

export const ProductContext = createContext({} as productContextType)

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<JoyStoreItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { 'joysystem.token': token } = parseCookies();

  useEffect(() => {
    if (token) {
      setLoading(true)
      fetch('https://joy-system-server-production.up.railway.app/store/products', {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`
        },
      }).then((response) => response.json())
        .then((data) => {
          setProducts(data)
        })
        .catch((error) => {
          console.error('Error on searching products', error)
          setError('error on searching products')
        })
        .finally(() => setLoading(false))
    }
  }, [token])

  const addProduct = async (newProduct: JoyStoreItem) => {
    setLoading(true)
     try {
      const response = await api.post('/store/products', newProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      toast.success("Product created successfully!");
      setProducts((prevProducts) => [...prevProducts, response.data]);
    } catch (err) {
      setError('Error on adding the product');
      toast.error("Quest was not created")
    } finally {
      setLoading(false)
    }
  };

  const editProduct = async (updatedProduct: JoyStoreItem) => {
    setLoading(true)
    try {
      await api.put(`/store/products/${updatedProduct.id}`, updatedProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      const response = await api.get('/store/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      toast.success("Product updated successfully!");
      setProducts(response.data);
    } catch (err) {
      console.error('Detailed error on editing product:', err)
      setError('Erro ao editar a product');
    } finally {
      setLoading(false);
    }
  }


  const deleteProduct = async (productId: number) => {
    try {
      await api.delete(`/store/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Product deleted successfully!");
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
    } catch (err) {
      setError('Error on deleting product');
      toast.error("Something went wrong on deleting")
    } finally {
      setLoading(false)
    }
  }

  return (
    <ProductContext.Provider value={{ products, loading, error, addProduct, editProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
}
