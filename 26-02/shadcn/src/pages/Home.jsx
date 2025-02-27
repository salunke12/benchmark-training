import { useGlobalContext } from "../context/GlobalState";
import ProductCard from "./ProductCard";
import { useState } from "react";

const Home = () => {
  const { state } = useGlobalContext();
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Extract unique categories
  const categories = [
    "all",
    ...new Set(state.products.map((product) => product.category)),
  ];

  // Filter products based on selected category
  const filteredProducts =
    selectedCategory === "all"
      ? state.products
      : state.products.filter(
          (product) => product.category === selectedCategory
        );

  return (
    <div>
      <h2>Products</h2>

      {/* Category Filter Dropdown */}
      <select
        onChange={(e) => setSelectedCategory(e.target.value)}
        value={selectedCategory}
      >
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category.toUpperCase()}
          </option>
        ))}
      </select>

      {/* Product List */}
      <div className="product-list">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
