import React, { useEffect, useState } from "react";

const Search = props => {

    const [cidades, seCidades] = useState([])

    useEffect(() => {
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                fetch(`https://ipapi.co/${data.ip}/json/`)
                    .then(response => response.json())
                    .then(data => {
                        const cidadeEstado = data.region_code;  // data.city
                        
                        fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${cidadeEstado}/distritos`)
                            .then(response => response.json())
                            .then(cidades => {
                                cidades.sort((a, b) => a.nome.localeCompare(b.nome));
                                seCidades(cidades)
                            })
                    })
            })
    }, [])
    return (
        <select>
            {cidades.map(cidade => (
                <option key={cidade.nome}>
                    {cidade.nome}
                </option>
            ))}
        </select>
    )
}

export default Search