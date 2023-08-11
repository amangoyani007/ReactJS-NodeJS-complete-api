import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {useCookies} from 'react-cookie'
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";

export default function Secret() {
  const navigate = useNavigate();
  const [cookie, setCookie, removeCookie] = useCookies([]);
  useEffect(() => {
    const verifyUser = async () => {
      if(!cookie.jwt){
        navigate("/");
      }else{
        const { data } = await axios.post("http://127.0.0.1:4000/register",{});
        if(!data.status){
          removeCookie("jwt");
          navigate("/login");
        }else toast(`Hi ${data.user}`)
      }
    };
    verifyUser();
  },[cookie, navigate]);

const logout = () => {
  navigate("/register");
}

  return (
    <div className="private">
      <h1>Super Secret Page</h1>
      <button onClick={logout}>Log Out</button>
      <ToastContainer/>
    </div>
  )
}
