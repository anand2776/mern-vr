import React, { useEffect, useState } from "react";
import API from "../api/axios";

export default function Home() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        API.get("/product")
            .then(res => setProducts(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="container">
            <h2>Products</h2>

            {products.map((p) => (
                <div key={p._id} style={{border:"1px solid black", margin:"10px", padding:"10px"}}>
                    <h4>{p.name}</h4>
                    <p>₹{p.price}</p>
                    <p>{p.description}</p>
                </div>
            ))}
        </div>
    );
}