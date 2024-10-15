import React from "react";
import './Header.css'
import logo from '../../img/logo-transparente.png'
import { Link, useNavigate } from 'react-router-dom'
import imgUsuario from '../../img/user.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import api from '../../auth/api'
import cookies from 'js-cookie'

const Header = props => {

    const navigate = useNavigate()

    const handleLogin = async () => {
        const token = cookies.get('token')
        const response = await api.get('http://localhost:8080/espacousuario', { withCredentials: true, headers: { Authorization: `Bearer ${token}` } })
        navigate(`/usuario/${response.data._id}`)
    }

    return (
        <header className="header">
            <div className="menu">
                <div className="logo">
                    <Link to="/">
                        <img src={logo} alt="Logo da SuperIndico" title="Logo da SuperIndico" />
                    </Link>
                </div>
                <div className="btnLogin">
                    <button type="button" className="button">
                        <Link to="/cadastrar">
                            Seja um profissional
                        </Link>
                    </button>
                    <button type="button" className="button">
                        <Link to="/entrar">
                            <FontAwesomeIcon icon={faUser} /> Entrar
                        </Link>
                    </button>
                    <button type="button" onClick={handleLogin}>
                        <img src={imgUsuario} alt="Espaço usuário" className="imgEspacoUsuario" title="Conta usuário" />
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header