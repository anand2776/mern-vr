import React, { useState } from "react";
import API from "../api/axios";

export default function AddProduct() {

    const [form, setForm] = useState({
        name: "",
        price: "",
        image: "",
        description: ""
    });

    function handleSubmit(e) {
        e.preventDefault();

        API.post("/product/add", {
            ...form,
            price: Number(form.price) // 🔥 FIX
        })
            .then(() => {
                alert("Product added successfully");
            })
            .catch(err => {
                console.log(err);
                alert(err.response?.data?.message || "Error adding product");
            });
    }

    return (
        <div className="container">
            <h2>Add Product</h2>

            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Name"
                    onChange={e => setForm({...form, name: e.target.value})}
                />
                <br/><br/>

                <input
                    placeholder="Price (numbers only)"
                    onChange={e => setForm({...form, price: e.target.value})}
                />
                <br/><br/>

                <input
                    placeholder="Image"
                    onChange={e => setForm({...form, image: e.target.value})}
                />
                <br/><br/>

                <input
                    placeholder="Description"
                    onChange={e => setForm({...form, description: e.target.value})}
                />
                <br/><br/>

                <button>Add Product</button>
            </form>
        </div>
    );
}