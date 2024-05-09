import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./dashboard.css";

function Dashboard() {
    const [orgData, setOrgData] = useState([]);
    const [userData, setUserData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const role = sessionStorage.getItem('role');
        const id = sessionStorage.getItem('id');
        if (!token) {
            navigate('/');
        }else if(role === 'admin'){
            fetchOrgData();
            fetchUserData();
        }else if(role === 'user'){
            fetchUserDataById(id);
        }
    }, []);

    const fetchOrgData = async () => {
        await fetch('http://localhost:1731/org/read-org', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.token
            }
        }).then(async(res)=>{
            if(res.status === 200){
                const responseData = await res.json();
                setOrgData(responseData);
            }
        })
    };

    const fetchUserData = async () => {
        await fetch('http://localhost:1731/user/read-user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.token
            }
        }).then(async(res)=>{
            if(res.status === 200){
                const responseData = await res.json();
                setUserData(responseData);
            }
        })
    };

    const fetchUserDataById = async (userId) => {
        await fetch(`http://localhost:1731/user/read-user-by-id/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.token
            }
        }).then(async(res)=>{
            if(res.status === 200){
                const responseData = await res.json();
                const userDataArray = Array.isArray(responseData) ? responseData : [responseData];
                setUserData(userDataArray);
            }
        })
    };

    return (
        <div>


            <h1>Organization Data</h1>
            {orgData.length > 0 ? (
                <center>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orgData.map(item => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </center>
            ) : (
                <p>No previlage organization data</p>
            )}


            
            <h1>User Data</h1>
            {userData.length > 0 ? (
                <center>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map(item => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </center>
            ) : (
                <p>No previlage for user data</p>
            )}


        </div>
    );
}

export default Dashboard;
