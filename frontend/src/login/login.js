import { useState } from "react"
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = ()=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const loginAPI = async(e)=>{
        e.preventDefault();
        if(validate()){
            let inputObj = {'email':email, 'password':password}
            await fetch('http://localhost:1731/user/login', {
                method:'POST',
                headers:{'content-type':'application/json'},
                body:JSON.stringify(inputObj)
            }).then(async (res)=>{
                if(res.status === 200){
                    const responseData = await res.json();
                    sessionStorage.setItem('token',responseData.token);
                    sessionStorage.setItem('role',responseData.role);
                    sessionStorage.setItem('id', responseData.id)
                    navigate('/dashboard');
                }else if(res.status === 404){
                    alert('User does not exists');
                }else if(res.status === 500){
                    alert('Something went wring')
                }
            })
        }
    }
    const validate = ()=>{
        if(email === '' || email === null){
            alert('Enter email');
            return false;
        }if(password === '' || password === null){
            alert('Enter password');
            return false;
        }
        return true;
    }
    return (
        <div className="login-container">
            <form onSubmit={loginAPI}>
                <label>E-Mail</label>
                <input name='email' type="text" value={email} onChange={e => setEmail(e.target.value)} />
                <label>Password</label>
                <input name='password' type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
            <a href="/register"><button>Register</button></a>
        </div>
    );
}

export default Login;