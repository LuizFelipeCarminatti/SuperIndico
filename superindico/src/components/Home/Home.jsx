import React from "react";
import './Home.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

import modelo from '../../img/modelo.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const Home = props => {
    return (
        <React.Fragment>
            <Header />
            <main className="conteudo">
                <section>
                    <article>
                        <div className="anuncio">
                            <div className="imagem">
                                <img src={modelo} alt="Profissional de limpeza" title="Profissional de limpeza" />
                            </div>
                            <div className="titulo">
                                <h1>Mais de X trabalhadores em um só lugar</h1>
                                <h3>Encontre profissionais e contrate serviços para sua casa</h3>
                            </div>
                        </div>
                        <div className="input">
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="search" />
                            <input type="text" name="pesquisar" className="pesquisar" placeholder="Onde você precisa?" />
                        </div>
                    </article>
                </section>
            </main>
            <Footer />
        </React.Fragment>
    )
}

export default Home