import React from "react";
import './Nav.css'
import { Link } from 'react-router-dom'

const Navegacao = props => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Ínicio</Link></li>
                <li><Link to="/ajuda">Ajuda</Link></li>
                <li><Link to="/termos">Termos de Uso</Link></li>
                <li><Link to="/politica">Política de Privacidade</Link></li>
                <li><Link to="/quemsomos">Quem Somos</Link></li>
            </ul>
        </nav>
    )
}

export default Navegacao