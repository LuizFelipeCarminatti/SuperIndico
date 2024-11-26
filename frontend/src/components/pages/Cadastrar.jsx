import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../Footer/Footer'
import logo from '../../img/logo-transparente.png'
import img from '../../img/limpeza.jpg'
import '../Home/Home.css'
import './Cadastrar.css'
//import axios from 'axios'
import api from '../../auth/api'

const Cadastrar = props => {

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [celular, setCelular] = useState('')
    const [cpf, setCpf] = useState('')
    const [city, setCity] = useState('')

    let navigate = useNavigate()

    const handlerSave = async (e) => {
        e.preventDefault()

        await api.post('http://localhost:8080/salvarUsuario', { nome, email, password, celular, cpf, city })
            .then(dados => {
                console.log('Dados enviados com sucesso!')
                setNome('')
                setEmail('')
                setPassword('')
                setCelular('')
                setCpf('')
                setCity('')
                setTimeout(() => {
                    navigate('/')
                }, 4000);
            })
            .catch(error => console.error(error))
    }

    const [visible, setVisible] = useState(false);
    const handleClose = () => {
        setVisible(true)
        setTimeout(() => {
            setVisible(false)
        }, 5000)
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
            <main className="conteudoFormulario conteudo">
                <section className="secaoFomulario">
                    <h1>Cadastra-se</h1>
                    <form onSubmit={handlerSave} method="post">
                        <input type="hidden" name="_csrf" value={'csrfToken'}/>
                        <label htmlFor="nome">Nome:</label>
                        <input type="text" name="nome" id="nome" placeholder="Digite seu nome:" value={nome} onChange={(e) => setNome(e.target.value)} />

                        <label htmlFor="email">E-mail:</label>
                        <input type="email" name="email" id="email" placeholder="Digite seu e-mail:" value={email} onChange={(e) => setEmail(e.target.value)} />

                        <label htmlFor="password">Senha:</label>
                        <input type="password" name="password" id="password" placeholder="Digite sua senha:" value={password} onChange={(e) => setPassword(e.target.value)} />

                        <label htmlFor="tel">Celular:</label>
                        <input type="tel" name="celular" id="tel" placeholder="Ex: DDD900000000" value={celular} onChange={(e) => setCelular(e.target.value)} />

                        <label htmlFor="cpf">CPF:</label>
                        <input type="text" name="cpf" id="cpf" placeholder="Ex: 000.000.000-00" value={cpf} onChange={(e) => setCpf(e.target.value)} />

                        <label htmlFor="city">Cidade:</label>
                        <input type="text" name="city" id="city" placeholder="Digite sua cidade:" value={city} onChange={(e) => setCity(e.target.value)} />

                        <button type="submit" onClick={() => handleClose()}>Cadastrar</button>
                    </form>
                </section>
                <img src={img} alt="" />
            </main>
            <Footer />
            <div className={`notification ${visible ? 'show' : ''}`}>
                <p>Alterações salvas com sucesso!</p>
            </div>
        </div>
    )
}

export default Cadastrar