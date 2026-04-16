import React, { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function handleLogin(e) {
        e.preventDefault();

        API.post("/auth/login", { email, password })
            .then((res) => {

                // ✅ show response
                console.log("DATA:", res.data);

                // ✅ save token
                const token = res.data.token;
                localStorage.setItem("token", token);

                // ✅ decode token
                const payload = JSON.parse(atob(token.split(".")[1]));
                console.log("DECODED TOKEN:", payload);

                // ✅ check role
                if (payload.role === "admin") {
                    console.log("You are ADMIN ✅");
                } else {
                    console.log("You are USER ❌");
                }

                alert(res.data.message);

                // redirect
                navigate("/");

            })
            .catch((err) => {
                console.log(err);

                if (err.response) {
                    alert(err.response.data.message);
                } else {
                    alert("Server error");
                }
            });
    }

    return (
        <div className='container'>
            <div className="row">
                <form onSubmit={handleLogin} className='col-12 col-md-6'>
                    
                    <h2>Login</h2>

                    <input
                        type="email"
                        placeholder="Enter Email"
                        className="form-control mb-2"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Enter Password"
                        className="form-control mb-2"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className='btn btn-primary'>Login</button>
                </form>
            </div>
        </div>
    );
}