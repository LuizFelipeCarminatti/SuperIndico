import React from "react";
import { Routes, Route } from 'react-router-dom'

import Home from '../Home/Home'
import Cadastrar from '../pages/Cadastrar'
import Entrar from '../pages/Entrar'

import Search from '../pages/Search'
import Ajuda from '../pages/Ajuda'
import Termos from '../pages/Termos'
import Politica from '../pages/Politica'
import QuemSomos from '../pages/QuemSomos'

const Rotas = props => {
    <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route path="/cadastrar" element={<Cadastrar />} />
        <Route path="/entrar" element={<Entrar />} />

        <Route path="/search" element={<Search />}/>
        <Route path="/ajuda" element={<Ajuda />} />
        <Route path="/termos" element={<Termos />} />
        <Route path="/politica" element={<Politica />} />
        <Route path="/quemsomos" element={<QuemSomos />} />
    </Routes>
}

export default Rotas