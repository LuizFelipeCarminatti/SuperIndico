import React, { useState } from "react";
import './Entrar.css'
import Footer from '../Footer/Footer'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../img/logo-transparente.png'
import axios from 'axios'
import img from '../../img/profisional.jpg'
import cookies from 'js-cookie'

const Entrar = props => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post('http://localhost:8080/login', { email, password }, { withCredentials: true })
            .then(user =>  {
                cookies.set('token', user.data.token)

                navigate(`/usuario/${user.data.user._id}`)
            })
            .catch(erros => console.log(erros))
    }

    return (
        <div className="body">
            <header className="headerFormulario header">
                <div>
                    <Link to='/'>
                        <img src={logo} alt="" />
                    </Link>
                </div>
            </header>
            <main>
                <section className="espacoLogin">
                    <form onSubmit={handleSubmit} method="post" className="formLogin">
                        <label htmlFor="email">E-mail: </label>
                        <input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu email:"/>
                        <label htmlFor="password">Senha: </label>
                        <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Digite sua senha:"/>
                        <button type="submit">Entrar</button>
                    </form>
                    <img src={img} alt="profisional" className="imagemDeLogin"/>
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default Entrar