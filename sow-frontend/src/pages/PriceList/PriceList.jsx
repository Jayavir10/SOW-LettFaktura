import React, { useContext, useEffect, useState } from "react";
import "./PriceList.jsx.css";
import AddProductModal from "../../components/Modals/AddProductModal";
import { AppContext } from "../../Context/AppContext";
import axios from "axios";

const PriceList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editDropdown, setEditDropdown] = useState(false);
  const [errors, setErrors] = useState({});

  const { backendURL, auth, products, getProducts } = useContext(AppContext);

  useEffect(() => {
    if (auth) {
      getProducts();
    }
  }, [auth]);

  const updateProduct = async (id, field, value) => {
    try {
      const productData = { ...products.find((p) => p.id === id) };

      productData[field] = value;

      const {data} = await axios.put(`${backendURL}/api/products/update/${id}`, productData, {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      });

      if (!data.success) {
        setErrors((prev) => ({
          ...prev,
          [`${id}_${field}`]: data.message,
        }));
      } else {
        setErrors((prev) => {
          const copy = { ...prev };
          delete copy[`${id}_${field}`];
          return copy;
        });
      }

      getProducts();
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const {data} = await axios.delete (`${backendURL}/api/products/delete/${id}`,{headers: { Authorization: `Bearer ${auth}`}} )

      if (data.success) {
        console.log(data.message)
        getProducts()
      } else {
        console.log(data.message)
      }
      
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="filter-table-wrapper">
      <div className="filter-wrapper">
        <div className="search-filter-wrapper">
          <div className="searchbar">
            <input
              type="search"
              id="article-no"
              name="article-no"
              placeholder="Search Article No..."
            />
            <i className="fa fa-search search-icon"></i>
          </div>
          <div className="searchbar">
            <input
              type="search"
              id="products"
              name="products"
              placeholder="Search Product..."
            />
            <i className="fa fa-search search-icon"></i>
          </div>
        </div>
        <div className="filter-btn-wrapper">
          <button className="filter-btn" onClick={() => setIsModalOpen(true)}>
            New Product
            <span>
              <i className="fa fa-plus-circle add-icon"></i>
            </span>
          </button>
          <button className="filter-btn">
            Print List
            <span>
              <i className="fa fa-print print-icon"></i>
            </span>
          </button>
          <button className="filter-btn">
            Advanced Mode
            <span>
              <i className="fa fa-toggle-on toggle-icon"></i>
            </span>
          </button>
        </div>
      </div>

      {isModalOpen && <AddProductModal setIsModalOpen={setIsModalOpen} />}

      <div className="table-wrapper">
        <table className="product-table">
          <thead>
            <tr className="table-heading">
              <th>Article No.</th>
              <th>Product/Service</th>
              <th>In Price</th>
              <th>Price</th>
              <th>Unit</th>
              <th>In Stock</th>
              <th>Description</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {products &&
              products.length > 0 &&
              products.map((product) => (
                <tr className="table-data" key={product.id}>
                  <td>
                    <input
                      type="number"
                      defaultValue={product.article_no}
                      onChange={(e) => (product.article_no = e.target.value)}
                      onBlur={(e) =>
                        updateProduct(product.id, "article_no", e.target.value)
                      }
                    />
                    {errors[`${product.id}_article_no`] && (
                      <div className="field-error">
                        {errors[`${product.id}_article_no`]}
                      </div>
                    )}
                  </td>
                  <td>
                    <input
                      type="text"
                      defaultValue={product.name}
                      style={{ textAlign: "left" }}
                      onChange={(e) => (product.name = e.target.value)}
                      onBlur={(e) =>
                        updateProduct(product.id, "name", e.target.value)
                      }
                    />
                    {errors[`${product.id}_name`] && (
                      <div className="field-error">
                        {errors[`${product.id}_name`]}
                      </div>
                    )}
                  </td>
                  <td>
                    <input
                      type="number"
                      defaultValue={product.in_price}
                      onChange={(e) => (product.in_price = e.target.value)}
                      onBlur={(e) =>
                        updateProduct(product.id, "in_price", e.target.value)
                      }
                    />
                    {errors[`${product.id}_in_price`] && (
                      <div className="field-error">
                        {errors[`${product.id}_in_price`]}
                      </div>
                    )}
                  </td>
                  <td>
                    <input
                      type="number"
                      defaultValue={product.price}
                      onChange={(e) => (product.price = e.target.value)}
                      onBlur={(e) => {
                        updateProduct(product.id, "price", e.target.value);
                      }}
                    />
                    {errors[`${product.id}_price`] && (
                      <div className="field-error">
                        {errors[`${product.id}_price`]}
                      </div>
                    )}
                  </td>
                  <td>
                    <input
                      type="text"
                      defaultValue={product.unit}
                      onChange={(e) => (product.unit = e.target.value)}
                      onBlur={(e) =>
                        updateProduct(product.id, "unit", e.target.value)
                      }
                    />
                    {errors[`${product.id}_unit`] && (
                      <div className="field-error">
                        {errors[`${product.id}_unit`]}
                      </div>
                    )}
                  </td>
                  <td>
                    <input
                      type="number"
                      defaultValue={product.in_stock}
                      onChange={(e) => (product.in_stock = e.target.value)}
                      onBlur={(e) =>
                        updateProduct(product.id, "in_stock", e.target.value)
                      }
                    />
                    {errors[`${product.id}_in_stock`] && (
                      <div className="field-error">
                        {errors[`${product.id}_in_stock`]}
                      </div>
                    )}
                  </td>
                  <td>
                    <input
                      type="text"
                      defaultValue={product.description}
                      style={{ textAlign: "left" }}
                      onChange={(e) => (product.description = e.target.value)}
                      onBlur={(e) =>
                        updateProduct(product.id, "description", e.target.value)
                      }
                    />
                    {errors[`${product.id}_description`] && (
                      <div className="field-error">
                        {errors[`${product.id}_description`]}
                      </div>
                    )}
                  </td>
                  <td className="action-btn-wrapper">
                    <div className="action-dropdown-container">
                      <button
                        className="action-btn"
                        onClick={() =>
                          setEditDropdown(
                            editDropdown === product.id ? null : product.id
                          )
                        }
                      >
                        <i className="fa fa-ellipsis-h" aria-hidden="true" />
                      </button>

                      {editDropdown === product.id && (
                        <div className="edit-dropdown-wrapper">
                          <ul className="edit-dropdown">
                            <li
                              style={{ color: "red" }}
                              className="edit-dropdown-item"
                              onClick={() => deleteProduct(product.id)}
                            >
                              Delete
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PriceList;
