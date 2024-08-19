import React from "react";
import { Routes, Route } from 'react-router-dom'

import Home from '../Home/Home'
import Search from '../Search/Search'

const Rotas = props => {
    <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/search" element={<Search />}/>
    </Routes>
}

export default Rotas