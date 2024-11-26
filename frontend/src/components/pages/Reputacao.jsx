import React from "react";
import './Reputacao.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-regular-svg-icons'

const Reputacao = props => {



    return (
        <ul>
            <li><FontAwesomeIcon icon={faStar} /></li>
            <li><FontAwesomeIcon icon={faStar} /></li>
            <li><FontAwesomeIcon icon={faStar} /></li>
            <li><FontAwesomeIcon icon={faStar} /></li>
            <li><FontAwesomeIcon icon={faStar} /></li>
        </ul>
    )
}

export default Reputacao