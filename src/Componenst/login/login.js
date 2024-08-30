import React, {useState} from 'react';
import './login_css.css'
import validationLogin from "./validationLogin";
import axios from "axios";


const Login = () => {

    const [values, setValues] = useState({
        email: "",
        password: "",
    });
    const handleChange = (event)=>{
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }
    const [error, setError] = useState({});


    const [loginError, setLoginError] = useState('');


    const handleSubmit = (event) => {
        setError(validationLogin(values));
        if (Object.keys(error).length ===0){
            axios.post('http://localhost:5000/login', values).then((res) => {
                debugger;
                const accessToken = res.data.accessToken;
                localStorage.setItem('Token', accessToken);
                localStorage.setItem('userId', res.data.user.id);
                console.log(res)
                window.location.href = '/admin'
            }).catch((err) => {
                debugger;
                if (err.response && err.response.status === 401) {
                    setLoginError('Invalid email or password');
                } else {
                    console.error('An unexpected error occurred:', err);
                }
            });
        }

    }


    return (
        <div className='vh-100 d-flex justify-content-center align-items-center'>
            <div className="container   card col-12 col-md-7 col-lg-4 ">
                <h2 className='text-center'>LOGIN</h2>

                <div className="mb-3 mt-3  ">
                    <label htmlFor="email">Email:</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" onChange={handleChange}/>
                    { error.email && <span className={'text-danger'}>{error.email}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="password">Password:</label>
                    <input type="password" className="form-control" id="password" placeholder="Enter password" name="password" onChange={handleChange}/>
                    { error.password && <span className={'text-danger'}>{error.password}</span> }
                </div>
                {loginError && <span className={'text-danger'}>{loginError}</span>}
                <div className="form-check mb-3">
                    <label className="form-check-label">
                        <input className="form-check-input" type="checkbox" name="remember"/> Remember me
                    </label>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Login</button>

            </div>
        </div>
    );
};

export default Login;

