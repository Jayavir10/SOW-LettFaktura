import React, { useState } from "react";
import "./PriceList.jsx.css";

const PriceList = () => {
  const {searchArticleNo, setSearchArticleNo} = useState("")
  const {searchProducts, setSearchProducts} = useState("")

  return (
    <div>
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
          <button className="filter-btn">New Product<span><i className="fa fa-plus-circle add-icon"></i></span></button>
          <button className="filter-btn">Print List<span><i className="fa fa-print print-icon"></i></span></button>
          <button className="filter-btn">Advanced Mode<span><i className="fa fa-toggle-on toggle-icon"></i></span></button>
        </div>
      </div>
    </div>
  );
};

export default PriceList;
