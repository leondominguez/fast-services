import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../components/Login/Login";
import NotFound from "../components/NotFound/NotFound";
import { UserRegister } from "../components/Register/UserRegister";
import { WorkerRegister } from "../components/Register/WorkerRegister";



export default function LoginOrRegister(props) {
    
    return (
        <div>
             <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/UserRegister" element={<UserRegister />} />
                <Route path="/WorkerRegister" element={<WorkerRegister />} />
                <Route path="*" element={<NotFound />} />
             </Routes>
        </div>
    )
}