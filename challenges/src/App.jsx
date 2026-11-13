
import { useState } from "react";
import { products } from "./challenges/products";
import "./App.css";

function App() {

  // Step 1: Create states
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  // Step 2: Generate categories dynamically
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category))
  ];

  // Step 3: Filter products using search and category
  const filteredProducts = products.filter((product) => {

    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  // Step 4: Sort products without changing original array
  const sortedProducts = [...filteredProducts].sort((a, b) => {

    if (sortBy === "price-low") {
      return a.price - b.price;
    }

    if (sortBy === "price-high") {
      return b.price - a.price;
    }

    if (sortBy === "rating-high") {
      return b.rating - a.rating;
    }

    return 0;
  });

  // Step 5: Calculate average price using reduce
  const averagePrice =
    sortedProducts.length > 0
      ? sortedProducts.reduce(
          (sum, product) => sum + product.price,
          0
        ) / sortedProducts.length
      : 0;

  // Step 6: Clear all filters
  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setSortBy("default");
  };

  // Step 7: Display application
  return (
    <div className="app">

      <header className="header">
        <h1>Product Store</h1>
        <p>Find your favourite products</p>
      </header>

      {/* Search and filter section */}
      <div className="filter-section">

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
        >
          <option value="default">Default Sorting</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating-high">Rating: High to Low</option>
        </select>

        <button onClick={clearFilters}>
          Clear Filters
        </button>

      </div>

      {/* Product information */}
      <div className="product-info">

        <p>
          Showing {sortedProducts.length} of {products.length} products
        </p>

        <p>
          Average Price: ₹{averagePrice.toFixed(2)}
        </p>

      </div>

      {/* Product cards */}
      {sortedProducts.length === 0 ? (

        <div className="empty-state">
          <h2>No Products Found!</h2>
          <p>Try changing your search or filters.</p>
        </div>

      ) : (

        <div className="product-container">

          {sortedProducts.map((product) => (

            <div className="product-card" key={product.id}>

              <h2>{product.name}</h2>

              <p className="category">
                {product.category}
              </p>

              <h3>
                ₹{product.price.toLocaleString("en-IN")}
              </h3>

              <p>
                ⭐ {product.rating}
              </p>

            </div>

          ))}

        </div>

      )}

      <footer>
        <p>Product Filter & Sort | Student Tribe Challenge 1</p>
      </footer>

    </div>
  );
}

export default App;
