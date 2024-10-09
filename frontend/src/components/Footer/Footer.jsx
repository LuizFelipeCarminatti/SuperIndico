import React from "react";
import './Footer.css'
import Nav from '../Links/Nav'
import logo from '../../img/logo-transparente.png'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faSquareInstagram } from '@fortawesome/free-brands-svg-icons'
 
const Footer = props => {

    const dataAtual = () => {
        let date = new Date()
        let ano = date.getFullYear()
        return ano
    }

    return (
        <footer className="footer">
            <div className="footerBody">
                <div className="redeSociais">
                    <h1>Redes Sociais</h1>
                    <Link to="https://pt-br.facebook.com/" target="_blank">
                        <FontAwesomeIcon icon={faFacebook} className="facebook" />
                    </Link>
                    <Link to="https://www.instagram.com/" target="_blank">
                        <FontAwesomeIcon icon={faSquareInstagram} className="instagram" />
                    </Link>
                </div>
                <div className="empresa">
                    <div className="logo">
                        <Link to="/">
                            <img src={logo} alt="Logo da SuperIndico" title="Logo da SuperIndico" />
                        </Link>
                    </div>
                    <Nav />
                </div>
            </div>
            <div className="footerMain">
                <p>&copy; 2026 - {dataAtual()}, Desenvolvido por Super<span>Indico</span></p>
            </div>
        </footer>
    )
}

export default Footer