import React from "react";
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

const Home = props => {
    return (
        <React.Fragment>
            <Header />
            <main className="conteudo">
                <h1>Componente</h1>
            </main>
            <Footer />
        </React.Fragment>
    )
}

export default Home