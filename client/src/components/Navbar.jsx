import React from "react";

export default function Navbar() {

    const token = localStorage.getItem("token");

    let role = null;

    if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        role = payload.role;
    }

    return (
        <div>
            <a href="/">Home</a> | 
            <a href="/login">Login</a> | 
            <a href="/register">Register</a>

            {role === "admin" && (
                <> | <a href="/add-product">Add Product</a></>
            )}
        </div>
    );
}