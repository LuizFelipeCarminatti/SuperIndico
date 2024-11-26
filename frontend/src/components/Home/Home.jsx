import React, { useState, useEffect, useRef } from "react";
import './Home.css'
import { useNavigate, Link } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import axios from 'axios'
import modelo from '../../img/modelo.png'
import io from 'socket.io-client'
import cookies from 'js-cookie'
import api from '../../auth/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faAngleUp } from '@fortawesome/free-solid-svg-icons'

const Home = props => {

    const [search, setSearch] = useState('')
    const [lista, setLista] = useState([])

    const navigate = useNavigate()

    const searchUsers = async (e) => {
        e.preventDefault()
        navigate(`/lista/${search}`)
    }

    const getUser = async () => {
        try {
            const users = await axios.get('http://localhost:8080/primeirosUsuarios')
            setLista(users.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    const anterior = () => {
        const newLista = [...lista]
        const lastSlide = newLista.splice(newLista.length - 1, 1)
        newLista.unshift(lastSlide[0])
        setLista(newLista)
    }

    const proximo = () => {
        const newLista = [...lista]
        const firstSlide = newLista.splice(0, 1)
        newLista.push(firstSlide[0])
        setLista(newLista)
    }

    const [btn, setBtn] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 400) {
                setBtn(true)
            } else {
                setBtn(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
    }, [])

    const handleClick = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }

    const [mensagem, setMensagem] = useState([])

    const aceitar = () => {

    }

    const recusar = () => {
        setMensagem('')
    }

    const socketRef = useRef(null);
    const token = cookies.get('token')

    useEffect(() => {
        async function me() {
            const response = await api.get('http://localhost:8080/espacousuario', {
                withCredentials: true,
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        }

        const connectSocket = async () => {
            if (token && !socketRef.current) {
                const tempAccount = await me();
                
                // Crie uma conexão de socket apenas se ainda não estiver conectada
                socketRef.current = io('http://localhost:8080');

                // Emite o evento `join` após conectar
                socketRef.current.emit('join', { id: tempAccount._id, nome: tempAccount.nome });

                // Configura o listener do socket
                socketRef.current.on('new-requested-services', (data) => {
                    setMensagem([{ message: data.message }])
                });
            }
        };
        connectSocket();

        // Função de limpeza para desmontar o listener e desconectar o socket
        return () => {
            if (socketRef.current) {
                socketRef.current.off('new-requested-services');
                socketRef.current.disconnect();
                socketRef.current = null; // Reseta o socketRef
            }
        };
    }, [token]); // Reexecuta apenas se `token` mudar

    return (
        <div className="body">
            <Header />
            <main className="conteudo">
                <section className="sectionPesquisa">
                    <article>
                        <div className="apresentacao">
                            <div className="imagem">
                                <img src={modelo} alt="Profissional de limpeza" title="Profissional de limpeza" />
                            </div>
                            <div className="titulo">
                                <h1>Mais de X trabalhadores em um só lugar</h1>
                                <h3>Encontre profissionais e contrate serviços para sua casa ou empresa!</h3>
                            </div>
                        </div>
                        <div className="input">
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="search" onClick={searchUsers} />
                            <input type="text" name="pesquisar" className="pesquisar" placeholder="Onde você precisa?" value={search}
                                onChange={(e) => setSearch(e.target.value)} />
                        </div>
                    </article>
                    <div>
                        {
                            mensagem.length > 0 && (
                                mensagem.map(msg => (
                                    <div className="contrato" key={Math.random()}>
                                        <p>{msg.message}</p>
                                        <div className="btns">
                                            <button type="button" onClick={aceitar}>Aceitar</button>
                                            <button type="button" onClick={recusar}>Recusar</button>
                                        </div>
                                    </div>
                                ))
                            )
                        }
                    </div>
                </section>
                <section className="profisionais">
                    <h1>Profissionais melhor classificados</h1>
                    <p className="subtitulo">Adquira melhor serviço com estes profissionais</p>
                    <article className="listaDeUsuario">
                        <button onClick={anterior}>Anterior</button>
                        <ul>
                            {
                                lista.map(usuario => (
                                    <Link to={`/perfil/${usuario._id}`} key={usuario._id}>
                                        <li className="usuario">
                                            <p>Nome: {usuario.nome}</p>
                                        </li>
                                    </Link>
                                ))
                            }
                        </ul>
                        <button onClick={proximo}>Próximo</button>
                    </article>
                </section>

                {btn && (
                    <button type="button" className="arrastar" onClick={handleClick}>
                        <span><FontAwesomeIcon icon={faAngleUp} /></span>
                    </button>
                )

                }
            </main>
            <Footer />
        </div>
    )
}

export default Home