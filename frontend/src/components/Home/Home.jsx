import React, { useState } from "react";
import './Home.css'
import { useNavigate } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

import modelo from '../../img/modelo.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const Home = props => {

    const [search, setSearch] = useState('')

    const navigate = useNavigate()

    const searchUsers = async (e) => {
        e.preventDefault()
        navigate(`/lista/${search}`)
    }

    return (
        <div className="body">
            <Header />
            <main className="conteudo">
                <section>
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
                            onChange={(e) => setSearch(e.target.value)}/>
                        </div>
                    </article>
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default Home