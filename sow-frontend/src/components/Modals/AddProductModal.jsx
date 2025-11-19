import React, { useContext, useEffect, useState } from "react";
import "./AddProductModal.jsx.css";
import axios from "axios";
import { AppContext } from "../../Context/AppContext";

const AddProductModal = ({ setIsModalOpen }) => {
  const [articleNo, setArticleNo] = useState("");
  const [productName, setProductName] = useState("");
  const [inPrice, setInPrice] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("");
  const [inStock, setInStock] = useState("");
  const [description, setDescription] = useState("");

  const { backendURL, auth, getProducts } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fields = {
        article_no: articleNo,
        name: productName,
        in_price: Number(inPrice),
        price: Number(price),
        unit: unit,
        in_stock: inStock ? Number(inStock) : 0,
        description: description || "",
      };

      const { data } = await axios.post(
        `${backendURL}/api/products/add`,
        fields,
        { headers: { Authorization: `Bearer ${auth}` } }
      );

      if (data.success) {
        console.log("Products added successfully");
        setArticleNo("");
        setProductName("");
        setInPrice("");
        setPrice("");
        setUnit("");
        setInStock("");
        setDescription("");
        setIsModalOpen(false);
        getProducts()
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

 

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={() => setIsModalOpen(false)}>
          ✕
        </button>
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit} className="add-product-form-wrapper">
          <div className="add-product-form">
            <label htmlFor="articleNo">Article No.</label>
            <input
              type="articleNo"
              id="articleNo"
              name="articleNo"
              placeholder="Enter Article No..."
              value={articleNo}
              onChange={(e) => setArticleNo(e.target.value)}
              required
            />
          </div>
          <div className="add-product-form">
            <label htmlFor="productName">Product Name</label>
            <input
              type="productName"
              id="productName"
              name="productName"
              placeholder="Enter Product Name..."
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>
          <div className="add-product-form">
            <label htmlFor="inPrice">In Price</label>
            <input
              type="number"
              id="inPrice"
              name="inPrice"
              placeholder="Enter In Price..."
              value={inPrice}
              onChange={(e) => setInPrice(e.target.value)}
            />
          </div>

          <div className="add-product-form">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Enter Price..."
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="add-product-form">
            <label htmlFor="unit">Unit</label>
            <input
              type="text"
              id="unit"
              name="unit"
              placeholder="Enter Unit (e.g. pcs, kg)..."
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            />
          </div>

          <div className="add-product-form">
            <label htmlFor="inStock">In Stock</label>
            <input
              type="number"
              id="inStock"
              name="inStock"
              placeholder="Enter Qty in stock..."
              value={inStock}
              onChange={(e) => setInStock(e.target.value)}
            />
          </div>

          <div className="add-product-form">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn-add">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
