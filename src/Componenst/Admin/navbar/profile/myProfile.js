import React, {useEffect, useState} from 'react';
import axios from "axios";
import myProfileValidation from "./myProfileValidation";


const MyProfile = () => {
    const [userInformation, setUserInformation] = useState({});
    const [changePassword, setChangePassword] = useState({
        password: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [passwordError, setPasswordError] = useState({});

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const Token = localStorage.getItem('Token');
        axios.get(`http://localhost:5000/users/${userId}`, {headers: {Authorization: `Bearer ${Token}`}})
            .then((res) => {
                const userData = res.data.result[0];
                setUserInformation(userData);
            })
            .catch((err) => {
                console.error('An unexpected error occurred:', err);
            });
    }, []);

    const handleChange = (event) => {
        setUserInformation(() => ({
            ...userInformation, [event.target.name]: event.target.value
        }))
    };

    const handleChangePassword = (event) => {
        setChangePassword(() => ({
            ...changePassword, [event.target.name]: event.target.value
        }))
    };

    const updatedPassword = () => {
        setPasswordError(myProfileValidation(changePassword))
        if (Object.keys(passwordError).length === 0) {
            const userId = localStorage.getItem('userId');
            const Token = localStorage.getItem('Token');
            axios.patch(`http://localhost:5000/users/${userId}`, changePassword,{headers: {Authorization: `Bearer ${Token}`}})
                .then((res) => {
                console.log(res);
            }).catch((err) => {
                console.error('An unexpected error occurred:', err);
            })
        }
    }

    const formattedBirthdate = userInformation.birthdate ?
        new Date(userInformation.birthdate).toISOString().split('T')[0] : '';


    return (
        <div className='d-flex justify-content-center align-items-center'>
            <div className={'container border border-1 rounded'}>
                <div className={'row'}>
                    <div className={'col-md-4'}>
                        <label className={'form-label '}>Name :</label>
                        <input
                            className={'form-control bg-white'}
                            type="text"
                            id="name"
                            name="name"
                            value={userInformation.name}
                            onChange={handleChange}

                        />
                    </div>
                    <div className={'col-md-4'}>
                        <label className={'form-label'}>Email :</label>
                        <input
                            className={'form-control bg-white'}
                            type="text"
                            id="email"
                            name="email"
                            value={userInformation.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={'col-md-4'}>
                        <label className={'form-label '}>Phone :</label>
                        <input
                            className={'form-control bg-white'}
                            type="text"
                            id="phone"
                            name="phone"
                            value={userInformation.phone}
                            onChange={handleChange}

                        />
                    </div>
                </div>
                <div className={'row'}>
                    <div className={'col-md-4'}>
                        <label className={'form-label '}>Facebook_Account :</label>
                        <input
                            className={'form-control bg-white'}
                            type="text"
                            id="facebook_account"
                            name="facebook_account"
                            value={userInformation.facebook_account}
                            onChange={handleChange}

                        />
                    </div>
                    <div className={'col-md-4'}>
                        <label className={'form-label'}>University :</label>
                        <input
                            className={'form-control bg-white'}
                            type="text"
                            id="university"
                            name="university"
                            value={userInformation.university}
                            onChange={handleChange}

                        />
                    </div>
                    <div className={'col-md-4'}>
                        <label className={'form-label '}>Gender :</label>
                        <input
                            className={'form-control bg-white'}
                            type="text"
                            id="gender"
                            name="gender"
                            value={userInformation.gender}
                            onChange={handleChange}

                        />
                    </div>
                </div>
                <div className={'row'}>
                    <div className={'col-md-4'}>
                        <label className={'form-label'}>Birthdate :</label>
                        <input
                            className={'form-control bg-white'}
                            type="text"
                            id="birthdate"
                            name="birthdate"
                            value={formattedBirthdate}
                            onChange={handleChange}

                        />
                    </div>
                    <div className={'col-md-4'}>
                        <label className={'form-label '}>Type :</label>
                        <input
                            className={'form-control bg-white'}
                            type="text"
                            id="type"
                            name="type"
                            value={userInformation.type}
                            onChange={handleChange}

                        />
                    </div>
                </div>
                <div className={'row float-end'}>
                    <div>
                        <button className={'btn btn-primary mx-1'}>
                            Update
                        </button>

                        <button className={'btn btn-primary mx-1'} data-bs-toggle="modal" data-bs-target="#myModal">
                            Change Password
                        </button>
                    </div>
                </div>
            </div>
            <div className="modal" id="myModal">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Change Password</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>


                        <div className="modal-body">
                            <div className="container border border-1 rounded">
                                <div className="row">
                                    <div>
                                        <label className="form-label">Password :</label>
                                        <input
                                            className="form-control bg-white"
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={changePassword.password}
                                            onChange={handleChangePassword}
                                        />
                                        {passwordError &&
                                            <span className={'text-danger'}>{passwordError.password}</span>}
                                    </div>
                                    <div>
                                        <label className="form-label">New Password :</label>
                                        <input
                                            className="form-control bg-white"
                                            type="password"
                                            id="newPassword"
                                            name="newPassword"
                                            value={changePassword.newPassword}
                                            onChange={handleChangePassword}
                                        />
                                        {passwordError &&
                                            <span className={'text-danger'}>{passwordError.password}</span>}
                                    </div>
                                    <div>
                                        <label className="form-label">Confirm Password :</label>
                                        <input
                                            className="form-control bg-white"
                                            type="password"
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            value={changePassword.confirmPassword}
                                            onChange={handleChangePassword}
                                        />
                                        {passwordError &&
                                            <span className={'text-danger'}>{passwordError.confirmPassword}</span>}
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-success" onClick={updatedPassword}>Update
                                Password
                            </button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default MyProfile;


