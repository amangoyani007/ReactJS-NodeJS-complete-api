import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";

export default function Register() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const generatedError = (err) => toast.error(err, { position: "bottom-right" });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log("in try");
            const { data } = await axios.post("http://127.0.0.1:4000/register", {
                ...values,
            }
            );

            if (data) {
                if (data.errors) {
                    const { email, password } = data.errors;
                    if (email) generatedError(email);
                    else if (password) generatedError(password);
                }
                else {
                    navigate("/");
                }

            }

            console.log("hello this is in try");
            console.log(data);
        } catch (err) {
            console.log(err, "this is err ..............");
        }
    };



    return (
        <div className="container">
            <h2>Register Account</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email"
                        name='email'
                        placeholder='Email'
                        onChange={(e) =>
                            setValues({ ...values, [e.target.name]: e.target.value })
                        }
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password"
                        name='password'
                        placeholder='Password'
                        onChange={(e) =>
                            setValues({ ...values, [e.target.name]: e.target.value })
                        }
                    />
                </div>
                <button type='submit'>Submit</button>
                <span>
                    Already have an account? <Link to="/Login">Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    );
}
