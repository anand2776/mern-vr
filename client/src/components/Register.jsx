import React, { useState } from 'react';
import API from '../api/axios';

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");

    function handleRegister(e) {
        e.preventDefault();

        API.post("/auth/register", {
            name,
            email,
            password,
            mobile: Number(mobile)
        })
        .then(res => {
            alert(res.data.message);
        })
        .catch(err => {
            if (err.response) {
                alert(err.response.data.message);
            } else {
                alert("Server error");
            }
        });
    }

    return (
        <div className='container'>
            <form onSubmit={handleRegister}>
                <h2>Register</h2>

                <input type="text" placeholder="Name"
                    onChange={(e)=>setName(e.target.value)} />

                <input type="email" placeholder="Email"
                    onChange={(e)=>setEmail(e.target.value)} />

                <input type="password" placeholder="Password"
                    onChange={(e)=>setPassword(e.target.value)} />

                <input type="text" placeholder="Mobile"
                    onChange={(e)=>setMobile(e.target.value)} />

                <button>Register</button>
            </form>
        </div>
    );
}