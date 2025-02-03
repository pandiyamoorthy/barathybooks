import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase/config';
import { collection, getDocs } from "firebase/firestore";
import { useHistory } from 'react-router-dom';

function ViewProducts() {
  const [products, setProducts] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsList);
    };
    fetchProducts();
  }, []);

  const handleEdit = (id) => {
    history.push(`/edit-product/${id}`);
  };

  return (
    <div>
      <h1>View Products</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => handleEdit(product.id)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewProducts;
