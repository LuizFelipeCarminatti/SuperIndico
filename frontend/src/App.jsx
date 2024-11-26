import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import Home from './components/Home/Home'

import Cadastrar from './components/pages/Cadastrar'
import Entrar from './components/pages/Entrar'
import Lista from './components/pages/Lista'
import Ajuda from './components/pages/Ajuda'
import Termos from './components/pages/Termos'
import Politica from './components/pages/Politica'
import QuemSomos from './components/pages/QuemSomos'
import Usuario from './components/pages/Usuario'
import Perfil from './components/pages/Perfil'
import Reputacao from './components/pages/Reputacao'

const App = props => {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/cadastrar" element={<Cadastrar />} />
          <Route path="/entrar" element={<Entrar />} />
          <Route path='/usuario/:id' element={<Usuario />} />
          <Route path='/lista/:city' element={<Lista />}/>
          <Route path="/ajuda" element={<Ajuda />} />
          <Route path="/termos" element={<Termos />} />
          <Route path="/politica" element={<Politica />} />
          <Route path="/quemsomos" element={<QuemSomos />} />
          <Route path="/perfil/:id" element={<Perfil />} />
          <Route path='/reputacao' element={<Reputacao />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
