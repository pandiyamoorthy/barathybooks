import React, { useEffect, useState } from 'react';
import './Products.css';
import { db } from '../../../firebase/config';
import { collection, getDocs } from "firebase/firestore";
import '../Home/Home.css'; // Import Home CSS for Nav-Bar and Footer

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsList = querySnapshot.docs
        .map(doc => doc.data())
        .filter(product => product.visibility === true); // Only include products with visibility set to true
      setProducts(productsList);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <section id="header">
        <a href="/"><img src="https://i.postimg.cc/x8ncvFjr/logo.png" alt="logo" /></a>
        <div>
          <ul id="navbar">
            <li><a href="/" >Home</a></li>
            <li><a href="/products" className="active">Shop</a></li>
            <li><a href="/valid-url">Blog</a></li>
            <li><a href="/valid-url">About</a></li>
            <li><a href="/valid-url">Contact</a></li>
            <li><a href="/valid-url" id="lg-bag"><i className="fal fa-shopping-bag"></i></a>
              <span className="quantity">0</span>
            </li>
            <li><a href="/valid-url" id="close"><i className="far fa-times"></i></a></li>
          </ul>
        </div>
        <div id="mobile">
          <a href="/valid-url"><i className="fal fa-shopping-bag"></i>
            <span className="quantity">0</span>
          </a>
          <i id="bar" className="fas fa-outdent"></i>
        </div>
      </section>
      
      <div className="products-container">
        <h1>Products Page</h1>
        <div style={{ marginTop: '100px' }} className="products-container">
          {products.map((product, index) => (
            <div className="product-card" key={index}>
              <img src={product.imageUrl} alt={product.name} />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>${product.price}</p>
            </div>
          ))}
        </div>
      </div>

      <footer className="section-p1">
        <div className="col">
          <a href="/"><img className="logo" src="https://i.postimg.cc/x8ncvFjr/logo.png" alt="logo" /></a>
          <h4>Contact</h4>
          <p><strong>Address:</strong> 349, Olorilogbon street, Onigbogbo Lagos</p>
          <p><strong>Phone:</strong> +23456876199, +23458903120</p>
          <p><strong>Hours:</strong> 10.00 - 18.00, Mon - Sat</p>
          <div className="follow">
            <h4>Follow Us</h4>
            <div className="icon">
              <i className="fab fa-facebook-f"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-youtube"></i>
              <i className="fab fa-pinterest-p"></i>
            </div>
          </div>
        </div>
        <div className="sec">
          <div className="col">
            <h4>About</h4>
            <a href="/valid-url">About Us</a>
            <a href="/valid-url">Delivery Information</a>
            <a href="/valid-url">Privacy Policy</a>
            <a href="/valid-url">Terms and Condition</a>
            <a href="/valid-url">Contact Us</a>
          </div>
          <div className="col">
            <h4>My Account</h4>
            <a href="/valid-url">Sign In</a>
            <a href="/valid-url">View Cart</a>
            <a href="/valid-url">My Account</a>
            <a href="/valid-url">My Wishlist</a>
            <a href="/valid-url">Track my Order</a>
            <a href="/valid-url">Help</a>
          </div>
          <div className="col install">
            <h4>Install App</h4>
            <p>From App Store or Google Play</p>
            <div className="row">
              <img src="https://i.postimg.cc/Y2s5mLdR/app.jpg" alt="" />
              <img src="https://i.postimg.cc/7YvyWTS6/play.jpg" alt="" />
            </div>
            <p>Secured Payment Gateways</p>
            <img src="https://i.postimg.cc/kgfzqVRW/pay.png" alt="" />
          </div>
        </div>
        <div className="coypright">
          <p>© 2023 All rights reserved! made by Tunrayo</p>
        </div>
      </footer>
    </div>
  );
}

export default Products;
