import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios'

const Lista = props => {

    const [usuarios, setUsuarios] = useState([])
    const { city } = useParams()
    useEffect(() => {
        const listaUsuarios = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/usuarios/${city}`)
                setUsuarios(response.data)
            } catch (error) {
                console.error(error)
            }
        }
        if (city) {
            listaUsuarios()
        }
    }, [city])

    return (
        <ul>
            {usuarios.map(usuario => (
                <li key={usuario._id}>{usuario.nome}</li>
            ))}
        </ul>
    )
}

export default Lista