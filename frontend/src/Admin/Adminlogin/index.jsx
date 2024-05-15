import "./admin.css";
import { useState } from "react";
import axios from "../../utils/axios"
import { saveCreds } from "../../utils";
import { useNavigate } from "react-router-dom";
const Adminlogin=()=>{
    const[admin,setAdmin]=useState({username:'',password:''})
    const navigate=useNavigate()
    const adminChange=(e,key)=>{
        console.log({...admin,[key]:e.target.value})
        setAdmin({...admin,[key]:e.target.value})

    }
    const adminLoginClick=async()=>{
        const response=await axios.post(`/admin/login`,admin)
        console.log(response.data)
        saveCreds(response.data.token)
        navigate('/admin/dashboard')
    }
    return <div className="admin">
        <h1>Adminlogin</h1>
        <div className="form-login">
            <label htmlFor="">username:</label>
            <input type="text" onChange={(e)=>adminChange(e,'username')} />
            <label htmlFor="">password:</label>
            <input type="password" onChange={(e)=>adminChange(e,'password')} />
            <button onClick={adminLoginClick}>login</button>


        </div>
    </div>

}
export default Adminlogin;
