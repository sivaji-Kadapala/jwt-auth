import React,{useContext,useState,useEffect} from 'react'
import {store} from './App';
import { Redirect } from 'react-router';
import axios from 'axios';
import avatar from './avatar.png';

const Myprofile = () => {
    const [token,setToken] = useContext(store);
    const [data,setData] = useState(null);
    useEffect(() =>{
        axios.get('https://mern-auth-jwt.herokuapp.com/myprofile',{
            headers: {
                'x-token' : token
            }
        }).then(res => setData(res.data)).catch((err) => console.log(err))
    },[token])
    if(!token){
        return <Redirect to='/login' />
    }
    return (
        <div>
            {
                data &&
            <center>
               
                <h5 ClassName="card-title bg-success">Welcome : {data.username}</h5>
                    <button ClassName="btn btn-primary" onClick={() => setToken(null)}>Logout</button>
                <div ClassName="card" style={{"width": "18rem"}}>
                <img ClassName="card-img-top" src={avatar} alt="Card image cap" />
                <div ClassName="card-body">
                    
                    
                </div>
                </div>
            </center>
        }
        </div>
    )
}

export default Myprofile
