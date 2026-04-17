import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

function Home() {
  const [products, setProducts] = useState([]);

  const token = localStorage.getItem("token");

  // ✅ Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/product");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Add to cart
  const addToCart = async (productId) => {
    try {
      await axios.post(
        "http://localhost:5000/cart/add",
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Added to cart");
    } catch (err) {
      console.log(err);
      alert("Error adding to cart");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="home">
      <h1 className="title">Products</h1>

      <div className="products-container">
        {products.map((p) => (
          <div className="product-card" key={p._id}>
            
            {/* 🔥 IMAGE FIX HERE */}
            <img src={`/${p.image}`} alt={p.name} />

            <h3>{p.name}</h3>

            <p className="price">₹{p.price}</p>

            <p className="desc">{p.description}</p>

            <button onClick={() => addToCart(p._id)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;