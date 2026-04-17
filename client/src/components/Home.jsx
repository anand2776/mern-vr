import { useEffect, useState } from "react";
import api from "../api/api";
import "./Home.css";

function Home() {
  const [products, setProducts] = useState([]);

  const token = localStorage.getItem("token");

  // ✅ Fetch products
  const fetchProducts = async () => {
    try {
      const res = await api.get("/product");
      setProducts(res.data);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  // ✅ Add to cart
  const addToCart = async (productId) => {
    try {
      await api.post(
        "/cart/add",
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Added to cart");
    } catch (err) {
      console.log("Cart error:", err);
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
            
            {/* ✅ IMPORTANT: IMAGE PATH FIX */}
            <img
              src={`https://mern-vr-1nlm.onrender.com/${p.image}`}
              alt={p.name}
            />

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