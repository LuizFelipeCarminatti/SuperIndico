import React, { useState, useEffect } from "react";
import './Usuario.css'
import logo from '../../img/logo-transparente.png'
import Footer from '../Footer/Footer'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import api from '../../auth/api'

const Usuario = props => {

    const { id } = useParams()

    const navigate = useNavigate()

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [celular, setCelular] = useState('')
    const [city, setCity] = useState('')
    const [sexo, setSexo] = useState('')
    const [cpf, setCpf] = useState('')

    const handleEdit = async (e) => {
        e.preventDefault()
        try {
            await axios.put(`http://localhost:8080/usuario/editar/${id}`, { nome, email, password, celular, city, sexo })
            getUser(id);
        } catch (error) {
            console.error(error);
        }

    }

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/usuario/excluir/${id}`)
            navigate('/')
        } catch (error) {
            console.error(error);
        }
    }

    const getUser = async (id) => {
        try {
            await api.get(`http://localhost:8080/usuario/${id}`, { withCredentials: true })
                .then(dados => {
                    const user = dados.data
                    setNome(user.nome)
                    setEmail(user.email)
                    setCelular(user.celular)
                    setCity(user.city)
                    setCpf(user.cpf)
                    setSexo(user.sexo)
                })
                .catch(error => console.error(error))
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUser(id);
    }, [id])


    const [visible, setVisible] = useState(false);
    const handleClose = () => {
        setVisible(true)
        setTimeout(() => {
            setVisible(false)
        }, 3000)
    }

    return (
        <div className="body">
            <header className="headerFormulario header">
                <div>
                    <Link to='/'>
                        <img src={logo} alt="" />
                    </Link>
                </div>
                <hr />
            </header>
            <main className="content">
                <section>
                    <div className="imagemUsuario"></div>
                    <label htmlFor="arquivo" className="enviarImg">Enviar imagem</label>
                    <input type="file" name="avatar" id="arquivo" />
                    <button className="salvarImagem">Salva imagem</button>

                    <div>
                        <form method="post" onSubmit={handleEdit}>
                            <div className="inputs">
                                <label htmlFor="nome">Nome:</label>
                                <input type="text" name="nome" id="nome" placeholder="Digite seu nome:" value={nome} onChange={(e) => setNome(e.target.value)} />
                                <label htmlFor="email">E-mail: </label>
                                <input type="email" name="email" id="email" placeholder="Digite seu e-mail:" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <label htmlFor="password">Senha:</label>
                                <input type="password" name="password" id="password" placeholder="Digite sua senha:" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <label htmlFor="tel">Celular: </label>
                                <input type="tel" name="celular" id="tel" placeholder="Ex: 51 90000-0000" value={celular} onChange={(e) => setCelular(e.target.value)} />
                                <label className="cpf">CPF: {cpf}</label>
                                <label htmlFor="city">Cidade: </label>
                                <input type="text" name="city" id="city" placeholder="Digite sua cidade:" value={city} onChange={(e) => setCity(e.target.value)} />
                                <label htmlFor="sexo">Sexo: </label>
                                <select name="sexo" id="sexo" onChange={(e) => setSexo(e.target.value)}>
                                    {
                                        sexo ? <option>{sexo}</option> : <option>Selecionar</option>
                                    }
                                    <option value="mulher">Mulher</option>
                                    <option value="homem">Homem</option>
                                </select>
                            </div>
                            <div className="btns">
                                <button type="button" className="bg-danger delete" onClick={() => handleDelete()}><Link to="http://localhost:3000">Delete conta</Link></button>
                                <button type="submit" className="salvar" onClick={() => handleClose()}>Salvar</button>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
            <Footer />
            <div className={`notification ${visible ? 'show' : ''}`}>
                <p>Alterações salvas com sucesso!</p>
            </div>
        </div>
    )
}

export default Usuario