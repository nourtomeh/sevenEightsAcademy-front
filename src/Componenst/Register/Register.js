import React, {useEffect, useState} from 'react';
import './Register.css';
import validation from './registerValidation'
import axios from "axios";
import {useNavigate} from 'react-router-dom';


const Register = () => {

    const navigate = useNavigate();

    const [values, setValues] = useState({

        name: '',
        email: '',
        password: '',
        phone: '',
        facebook_account: '',
        university: 'Palestine Technical University – Kadoorie',
        gender: '',
        birthdate: '',
    })

    const [error, setError] = useState({})
    useEffect(() => {
        const storedValues = JSON.parse(localStorage.getItem('registerValues'));
        if (storedValues) {
            setValues(storedValues);
        }
    }, []);
    const handleChange = (event) => {
        setValues({
            ...values, [event.target.name]: event.target.value
        })
        localStorage.setItem('registerValues', JSON.stringify({...values, [event.target.name]: event.target.value}))
    };


    const submit = () => {
        setError(validation(values));
        if (Object.keys(error).length === 0) {
            axios.post('http://localhost:5000/signup', values).then((res) => {
                console.log(res);
                const accessToken = res.data.accessToken;
                localStorage.setItem('Token', accessToken)
                localStorage.removeItem('registerValues')
                navigate('/home')
            }).catch((err) => {
                console.log(err);
            })
        } else {
            console.log(error);
        }

    }


    return (
        <div className={'container  vh-100'}>
        <div className='container card d-flex justify-content-sm-center flex-row flex-wrap'
             style={{borderRadius: '25px'}}>
            <div className='col-sm-12 col-md-10 col-lg-6 order-1 order-lg-0 '>
                <h1 className={'signUp'}>Register</h1>
                <div className='row'>
                    <div className='col-md-6'>
                        <label htmlFor={'name'} className='form-label'> name :</label>
                        <input type={'text'} className='form-control' placeholder='enter your name . . . ' id='name'
                               name={'name'} value={values.name} onChange={handleChange}/>
                        <span className={'text-danger'}> {error.name && <span>{error.name}</span>}</span>
                    </div>

                    <div className='col-md-6'>
                        <label htmlFor={'email'} className='form-label'> email :</label>
                        <input type={'text'} className='form-control' placeholder='enter your email . . .'
                               id='email' name={'email'} value={values.email} onChange={handleChange}/>

                        <span className={'text-danger'}> {error.email && <span>{error.email}</span>}</span>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6'>
                        <label htmlFor={'password'} className='form-label'> password :</label>
                        <input type={'text'} className='form-control' placeholder='enter your password . . . '
                               id='password' name={'password'} value={values.password} onChange={handleChange}/>
                        <span className={'text-danger'}> {error.password && <span>{error.password}</span>}</span>
                    </div>

                    <div className='col-md-6 cc'>
                        <label htmlFor={'phone'} className='form-label'> phone :</label>
                        <input type={'text'} className='form-control' placeholder='enter your phone . . .'
                               id='phone' name={'phone'} value={values.phone} onChange={handleChange}/>

                        <span className={'text-danger'}> {error.phone && <span>{error.phone}</span>}</span>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6'>
                        <label htmlFor={'facebook_account'} className='form-label'> facebook_account :</label>
                        <input type={'text'} className='form-control'
                               placeholder='enter your facebook_account  . . . '
                               id='facebook_account' name={'facebook_account'} value={values.facebook_account}
                               onChange={handleChange}/>
                        <span className={'text-danger'}> {error.facebook_account &&
                            <span>{error.facebook_account}</span>}</span>
                    </div>

                    <div className='col-md-6'>
                        <label htmlFor={'university'} className='form-label'> university :</label>
                        <select className="form-select" id="university" name={'university'} value={values.university}
                                onChange={handleChange}>
                            <option>Palestine Technical University – Kadoorie</option>
                            <option>An-Najah National University</option>
                            <option> Polytechnic University</option>
                            <option>Arab American University</option>
                            <option>Birzeit University</option>
                            <option>AlQuds Open University</option>
                            <option>Other</option>
                        </select>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6'>
                        <label htmlFor={'gender'} className='form-label'> gender :</label>
                        <br/>
                        <div className="form-check">
                            <input type="radio" className="form-check-input" id="radio1" name="gender"
                                   value="male" checked={values.gender === 'male'} onChange={handleChange}/>
                            <label className="form-check-label" htmlFor="radio1">Male</label>
                        </div>
                        <div className="form-check">
                            <input type="radio" className="form-check-input" id="radio2" name="gender"
                                   value="female" checked={values.gender === 'female'} onChange={handleChange}/>
                            <label className="form-check-label" htmlFor="radio2">Female</label>
                        </div>
                        <span className={'text-danger'}> {error.gender && <span>{error.gender}</span>}</span>
                    </div>

                    <div className='col-md-6'>
                        <label htmlFor={'birthdate'} className='form-label'> birthdate :</label>
                        <input type='date' className='form-control' id={'birthdate'} name={'birthdate'}
                               value={values.birthdate} onChange={handleChange}/>
                        <span className={'text-danger'}> {error.birthdate && <span>{error.birthdate}</span>}</span>

                    </div>
                </div>
                <div className='row' dir={'rtl'}>
                    <div className={'col-6 col-md-5 '}>
                        <button type={'submit'} className='btn btn-primary  ' style={{width: '100%'}}
                                onClick={submit}>Sign Up
                        </button>
                        <br/>
                        <br/>
                        <span dir={'ltr'}>you have an account ?</span>
                    </div>
                </div>

            </div>
            <div className=' col-sm-12 col-md-10 col-lg-6 d-flex align-items-center  order-0 order-lg-1'>
                <img className='img-fluid image ' src='/images/sevenEights%20img.jpg'/>
            </div>
        </div>
    </div>);
};

export default Register;

