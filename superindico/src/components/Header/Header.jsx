import React from "react";
import './Header.css'
import logo from '../../img/logo-transparente.png'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const Header = props => {
    return (
        <header className="header">
            <div className="menu">
                <div className="logo">
                    <Link to="/">
                        <img src={logo} alt="Logo da SuperIndico" title="Logo da SuperIndico" />
                    </Link>
                </div>
                <div className="btnLogin">
                    <button type="button" className="procurar">
                        <Link to="/search">
                            PROCURAR
                        </Link>
                    </button>
                    <button type="button">
                        <Link to="/cadastrar">
                            Seja um profissional
                        </Link>
                    </button>
                    <button type="button">
                        <Link to="/entrar">
                            <FontAwesomeIcon icon={faUser} /> Entrar
                        </Link>
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header