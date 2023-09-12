import React, { useState } from 'react'
import LoginForm from '../components/LoginForm';
import { login } from '../actions/auth';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

const Login = () => {
    const [email, setEmail] = useState('pnayak@mail.com');
    const [password, setPassword] = useState("Qwerty");
    const dispatch = useDispatch()
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('SEND LOGIN DATA', {email, password });
        try{
            let res = await login({ 
                email, 
                password 
            });
            if(res.data) {
                console.log(
                    'SAVE USER RESPONSE IN REDUX AND ALSO IN LOCAL STORAGE THEN REDIRECT ===> '
                );
                console.log(res.data);
                // SAVE THE TOKEN TO LOCALSTORAGE FOR AUTHENTICATION OF API CALLS
                window.localStorage.setItem("auth", JSON.stringify(res.data));
                // SAVE USER AND TOKEN TO REDUX
                dispatch({
                    type: "LOGGED_IN_USER",
                    payload: res.data
                });
            }
        } catch (err) {
            console.log(err);
            if(err.response.status === 400) toast.error(err.response.data)
        }
    }

    return (
        <>
        <div className='container-fluid bg-secondary p-5 text-center'>
            <h1>Login</h1>
        </div>

        <div className='container'>
            <div className='row'>
                <div className="col-md-6 offset-md-3">
                    <LoginForm
                        handleSubmit={handleSubmit}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                    />
                </div>
            </div>
        </div>
        </>
    );
};

export default Login;