import React, { useState } from "react";
import "./PriceList.jsx.css";
import AddProductModal from "../../components/Modals/AddProductModal";
import EditProductDropdown from "../../components/Modals/EditProductDropdown";

const PriceList = () => {
  const [searchArticleNo, setSearchArticleNo] = useState("");
  const [searchProducts, setSearchProducts] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editDropdown, setEditDropdown] = useState(false);

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
              value={searchArticleNo}
              onChange={(e) => setSearchArticleNo(e.target.value)}
            />
            <i className="fa fa-search search-icon"></i>
          </div>
          <div className="searchbar">
            <input
              type="search"
              id="products"
              name="products"
              placeholder="Search Product..."
              value={searchProducts}
              onChange={(e) => setSearchProducts(e.target.value)}
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
            <tr className="table-data">
              <td>
                <input type="number" name="article" value={"1234567890"} />
              </td>
              <td>
                <input
                  type="text"
                  name="product"
                  value={"This is a test product with fifty characters"}
                />
              </td>
              <td>
                <input type="number" name="in-price" value={"90000"} />
              </td>
              <td>
                <input type="number" name="price" value={"150000"} />
              </td>
              <td>
                <input type="text" name="unit" value={"kilometres/hour"} />
              </td>
              <td>
                <input type="number" name="in-stock" value={"2541033"} />
              </td>
              <td>
                <input
                  type="text"
                  name="description"
                  value={"This is the description with fifty characters"}
                />
              </td>
              <td className="action-btn-wrapper">
                <button
                  className="action-btn"
                  onClick={() => setEditDropdown(!editDropdown)}
                >
                  <i className="fa fa-ellipsis-h" aria-hidden="true" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        {editDropdown && (
          <div className="edit-dropdown-wrapper">
            <ul className="edit-dropdown">
              <li style={{ color: "red" }} className="edit-dropdown-item">
                Delete
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceList;
