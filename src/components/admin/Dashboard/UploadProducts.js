import React, { useState } from 'react';
import { db } from '../../../firebase/config';
import { collection, addDoc } from "firebase/firestore";
import * as XLSX from 'xlsx';

function UploadProducts() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [category, setCategory] = useState(""); // New state for category
  const [bulkMessage, setBulkMessage] = useState(""); // New state for bulk upload message

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "products"), {
        name,
        price,
        description,
        imageUrl,
        visibility,
        category // Include category in the product data
      });
      setMessage("Product uploaded successfully!");
      setName("");
      setPrice("");
      setDescription("");
      setImageUrl("");
      setVisibility(false);
      setCategory(""); // Reset category
    } catch (error) {
      console.error("Error uploading product: ", error);
      setMessage("Error uploading product. Please try again.");
    }
  };

  const handleBulkUpload = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      try {
        for (const product of jsonData) {
          await addDoc(collection(db, "products"), {
            name: product.name,
            price: product.price,
            description: product.description,
            imageUrl: product.imageUrl,
            visibility: product.visibility,
            category: product.category
          });
        }
        setBulkMessage("Bulk upload successful!");
      } catch (error) {
        console.error("Error uploading products: ", error);
        setBulkMessage("Error uploading products. Please try again.");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <h1>Upload Products</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
        <label>
          <input
            type="checkbox"
            checked={visibility}
            onChange={(e) => setVisibility(e.target.checked)}
          />
          Publish
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="" disabled>Select Category</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Science-Fiction">Science-Fiction</option>
          <option value="History">History</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Competitive-books">Competitive books</option>
          <option value="Self-help">Self-Help-personal development</option>
          <option value="Children's-Books">Children's Books</option>
          <option value="bio-auto">Biography and Autobiography</option>
          {/* Add more categories as needed */}
        </select>
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
      <h2>Bulk Upload</h2>
      <input type="file" accept=".csv, .xlsx, .xls" onChange={handleBulkUpload} />
      {bulkMessage && <p>{bulkMessage}</p>}
    </div>
  );
}

export default UploadProducts;
