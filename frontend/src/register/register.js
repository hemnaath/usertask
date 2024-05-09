import { useState } from "react"
import { useNavigate } from "react-router-dom";
import "./register.css";

const Register = ()=>{
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const registerAPI = async(e)=>{
        e.preventDefault();
        if(validate()){
            let inputObj = {'email':email, 'password':password, 'name':name, 'username':username, 'role':role}
            await fetch('http://localhost:1731/user/register', {
                method:'POST',
                headers:{'content-type':'application/json'},
                body:JSON.stringify(inputObj)
            }).then(async (res)=>{
                if(res.status === 201){
                    alert('Register success');
                    navigate('/');
                }else if(res.status === 500){
                    alert('Something went wrong');
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
        }if(name === '' || name === null){
            alert('Enter name');
            return false;
        }if(username === '' || username === null){
            alert('Enter username');
            return false;
        }if(role === '' || role === null){
            alert('Enter role');
            return false;
        }
        return true;
    }
    return (
        <form className="form-container" onSubmit={registerAPI}>
            <input name='name' type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)}/>
            <input name='username' type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}/>
            <input name='email' type="text" placeholder="E-Mail" value={email} onChange={e => setEmail(e.target.value)}/>
            <input name='password' type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
            <input name='role' type="text" placeholder="Role" value={role} onChange={e => setRole(e.target.value)}/>
            <button type="submit">Register</button>
        </form>
    );
}

export default Register;