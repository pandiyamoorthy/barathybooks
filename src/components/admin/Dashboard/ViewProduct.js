import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase/config';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

function ViewProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log("Fetched products:", productsList); // Debugging log
        setProducts(productsList);
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
      setProducts(products.filter(product => product.id !== id));
      console.log(`Product with id ${id} deleted`); // Debugging log
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div>
      <h1>View Products</h1>
      <div className="products-container">
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.imageUrl} alt={product.name} />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>${product.price}</p>
              <p>Category: {product.category}</p>
              <p>Visibility: {product.visibility ? "Public" : "Private"}</p>
              <button onClick={() => handleDelete(product.id)}>Delete</button>
              <button onClick={() => window.location.href=`/edit-product/${product.id}`}>Edit</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ViewProduct;
