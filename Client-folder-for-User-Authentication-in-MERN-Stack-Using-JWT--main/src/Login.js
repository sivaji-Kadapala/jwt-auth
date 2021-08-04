import React,{useState,useContext} from 'react'
import axios from 'axios';
import {store} from './App';
import { Redirect } from 'react-router';

const Login = () => {
    const [token,setToken] = useContext(store)
    const [data,setData] = useState({
        email:'',
        password:'',
    })
    const changeHandler = e =>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const submitHandler = e =>{
        e.preventDefault();
        axios.post('https://mern-auth-jwt.herokuapp.com/login',data).then(
            res => setToken(res.data.token)//Settoken is recieved from Register component
        )
    }
    if(token){
       return <Redirect to='/myprofile' />
    }
    return (
        <div>
            <center>
            <form onSubmit={submitHandler} autocomplete="off">
                <h3 style={{color: "black" ,fontFamily: "bold"}}>Login</h3>
                <input type="email" onChange={changeHandler} name="email" placeholder="Email" /><br />
                <input type="password" onChange={changeHandler} name="password" placeholder="Password" /><br />
                <input type="submit" value="Login" style={{backgroundColor:"blue" ,color:"white"}}/><br />
            </form>
            </center>
        </div>
    )
}

export default Login