import { useEffect, useState } from "react";
import { ACCESS_TOKEN } from "../../constants/Constants.js";
import { API_BASE_URL } from "../../constants/Constants.js";
import { useNavigate } from "react-router";

const Login = function(props){
    const [credentials,setCredentials] = useState({email: '', password: ''});
    const navigate = useNavigate();
    const handleLogin = async(e)=>{
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' ,"Access-Control-Allow-Origin": "*"},
            body: JSON.stringify(credentials)
        };
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`,requestOptions);
            if(response.ok){
                const data = await response.json();
                localStorage.setItem(ACCESS_TOKEN,data.jwtToken);
                props.setState((prevState)=>{return {...prevState, authenticated: true}})
                props.setCurrentSection(0);
                setCredentials(prevCred=>{return {...prevCred, password:''}})
                navigate("/home",{replace:true})
            }else{
                
            }
          } catch (error) {
            // Handle error
          }
    }
    useEffect(()=>{
        props.setCurrentSection(3);
    },[props])
    return (<div>
        <form onSubmit={handleLogin} className="p-4 flex flex-col items-center gap-3">
            <div className="flex gap-4 text-white">
                <label>User Name</label>
                <input type="text" placeholder="UserName Or Email" className="text-black" value={credentials.email} onChange={e=>{setCredentials({...credentials,email:e.target.value})}} required/>
            </div>
            <div className="flex gap-4 text-white">
                <label>Password</label>
                <input type="text" placeholder="Password" className="text-black" value={credentials.password} onChange={e=>{setCredentials({...credentials,password:e.target.value})}} required/>
            </div>    
            <button type="submit" className="bg-gray-700 w-32 rounded btn">Log In</button>
        </form>
    </div>)
}


export default Login;