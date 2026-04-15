import React, { useState } from 'react'
import API from '../api/axios'

export default function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [mobile, setMobile] = useState("")

    function handleRegister(e) {
        e.preventDefault()

        API.post("/auth/register", {
            name,
            email,
            password,
            mobile: Number(mobile)
        })
        .then((res) => {
            console.log(res)
            if (res.status === 201) {
                alert("Registration Successful ✅")
            }
        })
        .catch((err) => {
            console.log(err.response)
            alert(err.response?.data?.message || "Error occurred ❌")
        })
    }

    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <form onSubmit={handleRegister} className='col-12 col-md-6'>

                    <h1 className='mb-3'>Register</h1>

                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Mobile Number</label>
                        <input
                            type="text"
                            className="form-control"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className='btn btn-success w-100'>
                        Register
                    </button>

                </form>
            </div>
        </div>
    )
}