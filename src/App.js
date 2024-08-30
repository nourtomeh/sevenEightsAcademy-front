import React from 'react';
import './App.css';
import Register from "./Componenst/Register/Register";
import {Route, Routes} from "react-router-dom";
import Home from "./Componenst/Home/home";
import Login from "./Componenst/login/login";
import Admin from "./Componenst/Admin/admin";
import MyProfile from "./Componenst/Admin/navbar/profile/myProfile";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/admin" element={<Admin/>}/>
                <Route path="/profile" element={<MyProfile/>}/>

            </Routes>
        </div>
)
;
}

export default App;
