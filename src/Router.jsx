import React from 'react'
import { Route, Routes } from "react-router-dom";
import Portfolio from './Portfolio/Portfolio';
// import Freelance from './Freelance/Freelance';
const Router = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Portfolio />} >
                </Route>
                {/* <Route path="/Freelance" element={<Freelance />} >
                </Route> */}
            </Routes>
        </div>
    )
}

export default Router






