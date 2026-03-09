import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [products, setProducts] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [desc, setDesc] = useState("");
  const [editId, setEditId] = useState(null);

  const API = "http://localhost:5000/products";

  const getProducts = async () => {
    const res = await axios.get(API);
    setProducts(res.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      console.log("Product deleted successfully:", id);
      getProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const editProduct = (product) => {
    setEditId(product.id);
    setId(product.id);
    setName(product.name);
    setPrice(product.price);
    setImageUrl(product.imageUrl);
    setDesc(product.desc);
  };

  const addProduct = async () => {
    try {
      await axios.post(API, {
        id,
        name,
        imageUrl,
        price,
        desc,
      });
      console.log("Product added successfully");
      setId("");
      setName("");
      setImageUrl("");
      setPrice("");
      setDesc("");
      getProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const saveProduct = async () => {
    if (editId) {
      try {
        await axios.put(`${API}/${editId}`, {
          name,
          imageUrl,
          price,
          desc,
        });
        console.log("Product Updated: ", editId);
      } catch (error) {
        console.error("Error updating product:", error);
      }
    } else {

      await addProduct();
      return;
    }

    setEditId(null);
    setId("");
    setName("");
    setImageUrl("");
    setPrice("");
    setDesc("");
    getProducts();
  };

  return (
    <div>
      <h1>E-Commerce Products Crud</h1>

      <div className="form-container">
        <div className="input-row">
          <input type="number"
            placeholder="Product ID" name="p-id" id="p-id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            disabled={editId ? true : false}
          />
          <input type="text"
            placeholder="Product Name" name="p-name" id="p-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="input-row">
          <input type="text"
            placeholder="Image URL" name="imageUrl" id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <input type="number"
            placeholder="Price" name="price" id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <input type="text"
          placeholder="description" name="description" id="description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <div className="button-container">
          {editId ? (
            <button onClick={saveProduct}>Update Product</button>
          ) : (
            <button onClick={saveProduct}>Add Product</button>
          )}
        </div>
      </div>

      <h2>Products</h2>

      <div className="product-list">
        {products.map((p) => (
          <div className="product-card" key={p.id}>
            <p><strong>ID:</strong> {p.id}</p>
            <img src={p.imageUrl} alt={p.name} />
            <h3>{p.name}</h3>
            <p><strong>Price:</strong> ${p.price}</p>
            <p><strong>Description:</strong> {p.desc}</p>
            <div className="button-container">
              <button onClick={() => editProduct(p)}>Edit</button>
              <button onClick={() => deleteProduct(p.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;