import React, { useEffect, useState, useCallback, useRef } from "react";
import './Perfil.css';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import logo from '../../img/logo-transparente.png';

import { io } from 'socket.io-client';
import api from '../../auth/api';
import cookies from 'js-cookie';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileScreen, faSignature, faAt, faCity, faGenderless, faImagePortrait } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const Perfil = props => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [celular, setCelular] = useState('');
    const [city, setCity] = useState('');
    const [sexo, setSexo] = useState('');
    const [idade, setIdade] = useState('');
    const socketRef = useRef(null); // Para garantir que o socket seja único

    const { id } = useParams();
    const token = cookies.get('token');

    const perfilUsuario = async (id) => {
        try {
            const userDados = await axios.get(`http://localhost:8080/perfil/${id}`);
            let user = userDados.data;
            setNome(user.nome);
            setEmail(user.email);
            setCelular(user.celular);
            setCity(user.city);
            setSexo(user.sexo);
            setIdade(user.idade);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        perfilUsuario(id);
    }, [id]);

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

    const enviar = useCallback(() => {
        if (socketRef.current) {
            socketRef.current.emit('request-services', { id });
            console.log('Solicitação enviada para', id);
        } else {
            console.log('Socket não está conectado');
        }
    }, [id]);

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
            <main>
                <section className="perfil">
                    <div className="imagemPerfil">imagem</div>
                    <ul>
                        <li>
                            <p>Nome: <FontAwesomeIcon icon={faSignature} className="icon" />{nome}</p>
                            <p>E-mail: <FontAwesomeIcon icon={faAt} className="icon" />{email}</p>
                            <p>
                                Celular:
                                <FontAwesomeIcon icon={faMobileScreen} className="icon" />
                                {celular}
                                <a href={`https://web.whatsapp.com/send?phone=55${celular}`} target="_blank" rel="noreferrer"> Whatsapp<FontAwesomeIcon icon={faWhatsapp} className="whatsapp" /></a></p>
                            <p>Cidade: <FontAwesomeIcon icon={faCity} className="icon" />{city}</p>
                            {
                                sexo ? <p>Sexo: <FontAwesomeIcon icon={faGenderless} className="icon" />{sexo}</p> : ''
                            }
                            <p>Idade: <FontAwesomeIcon icon={faImagePortrait} className="icon" />{idade}</p>
                        </li>
                    </ul>
                    <button type="button" className="btnSolicitar" onClick={enviar}>Solicitar Serviço</button>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Perfil;
