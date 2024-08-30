import React, {useEffect, useState} from 'react';
import './admin.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {Link} from "react-router-dom";
import axios from "axios";


const Admin = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [userInformation, setUserInformation] = useState({});


    const toggle = () => {
        setIsOpen(!isOpen);
    };
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const Token = localStorage.getItem('Token');
        axios.get(`http://localhost:5000/users/${userId}`, {headers: {Authorization: `Bearer ${Token}`}})
            .then((res) => {
                setUserInformation(res.data.result[0]);
            })
            .catch((err) => {
                console.error('An unexpected error occurred:', err);
            });
    }, []);

    return (
        <div>

            <header className={' header fixed-top d-flex align-items-center  '}>
                <div className={'d-flex align-items-center justify-content-between'}>
                    <a className={'logo d-flex align-items-center text-decoration-none '}>
                        <img src={'/images/sevenEights img.jpg'} alt={''}/>
                        <span className={'p-1'}>Admin</span>
                    </a>
                    <i className={'bi bi-list '}  onClick={toggle}></i>
                </div>
                <nav className={'navbar navbar-expand ms-auto'}>
                    <ul className={'navbar-nav d-flex align-items-center'}>


                        <li className="nav-item dropdown pe-3" style={{cursor: 'pointer'}}>

                            <span className="nav-link nav-profile d-flex align-items-center pe-0 "  data-bs-toggle="dropdown">
                                <img src="/images/nour.jpg" alt="Profile" className="profile-img rounded-circle"/>
                                    <span className="d-none d-md-block dropdown-toggle ps-2">{userInformation.name}</span>
                            </span>

                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">


                                <li>
                                    <span className="dropdown-item d-flex align-items-center"  >
                                        <i className="bi bi-person"></i>
                                        <span className={'ps-2'}><Link className={'text-decoration-none text-dark'} to="/profile">My Profile</Link></span>
                                    </span>
                                </li>

                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>

                                <li>
                                    <span className="dropdown-item d-flex align-items-center" >
                                        <i className="bi bi-box-arrow-right"></i>
                                        <span className={'ps-2'}>
                                            <Link to={'/'} className={'text-decoration-none text-dark'} onClick={()=> localStorage.clear()}>Sign Out</Link>
                                        </span>
                                    </span>
                                </li>

                            </ul>
                        </li>  {/*profile*/}

                    </ul>
                </nav>

            </header>

            <aside id="sidebar"  className={'sidebar '} style={{left: isOpen  ? "-300px" : "0px"}} data-bs-parent="sidebar-nav">

                <ul className="sidebar-nav" id="sidebar-nav">

                    <li className="nav-item ">
                        <a className="nav-link ">
                            <i className="bi bi-grid"></i>
                            <span>Dashboard</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#components-nav"
                           data-bs-toggle="collapse">
                            <i className="bi bi-menu-button-wide"></i><span>Components</span><i
                            className="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="components-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <a>
                                    <i className="bi bi-circle"></i><span>Alerts</span>
                                </a>
                            </li>

                        </ul>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse"
                        >
                            <i className="bi bi-journal-text"></i><span>Forms</span><i
                            className="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="forms-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <a>
                                    <i className="bi bi-circle"></i><span>Form Elements</span>
                                </a>
                            </li>

                        </ul>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse"
                        >
                            <i className="bi bi-layout-text-window-reverse"></i><span>Tables</span><i
                            className="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="tables-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <a>
                                    <i className="bi bi-circle"></i><span>General Tables</span>
                                </a>
                            </li>
                        </ul>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#charts-nav" data-bs-toggle="collapse"
                        >
                            <i className="bi bi-bar-chart"></i><span>Charts</span><i
                            className="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="charts-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <a>
                                    <i className="bi bi-circle"></i><span>Chart.js</span>
                                </a>
                            </li>

                        </ul>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#icons-nav" data-bs-toggle="collapse"
                        >
                            <i className="bi bi-gem"></i><span>Icons</span><i
                            className="bi bi-chevron-down ms-auto"></i>
                        </a>
                    </li>
                    <ul id="icons-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                        <li>
                            <a>
                                <i className="bi bi-circle"></i><span>Bootstrap Icons</span>
                            </a>
                        </li>

                    </ul>
                </ul>

            </aside>

            <main id="main" className="main mt-5"
                  style={{marginLeft: isOpen ? "0px" : "300px", transition: "all 0.3s"}}>
                <div className="card info-card">
                    <div className="card-body">
                        <h5 className="card-title">Students</h5>

                    </div>

                </div>

            </main>
        </div>

    )
        ;
};

export default Admin;
{/*<li className="nav-item dropdown">*/}

{/*    <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">*/}
{/*        <i className ="bi bi-bell"></i>*/}
{/*        <span className="badge bg-primary badge-number">4</span>*/}
{/*    </a>*/}

{/*    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">*/}
{/*        <li className="dropdown-header">*/}
{/*            You have 4 new notifications*/}
{/*            <a href="#"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>*/}
{/*        </li>*/}
{/*        <li>*/}
{/*            <hr className="dropdown-divider"/>*/}
{/*        </li>*/}


{/*    </ul>*/}

{/*</li>  /!*notification*!/*/}

{/*<li className="nav-item dropdown">*/}

{/*    <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">*/}
{/*        <i className="bi bi-chat-left-text"></i>*/}
{/*        <span className="badge bg-success badge-number ">3</span>*/}
{/*    </a>*/}

{/*    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">*/}
{/*        <li className="dropdown-header">*/}
{/*            You have 3 new messages*/}
{/*            <a href="#"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>*/}
{/*        </li>*/}
{/*        <li>*/}
{/*            <hr className="dropdown-divider"/>*/}
{/*        </li>*/}
{/*    </ul>*/}

{/*</li>  /!*messages*!/*/}

