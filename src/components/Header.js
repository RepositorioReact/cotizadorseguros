import React from 'react';
import styled from '@emotion/styled'

//Se crea una variable de tipo componente para dar clase a un elemento html con styled, en este caso el header
const ContenedorHeader = styled.header`
    background-color: #26C6DA;
    padding: 10px;
    font-weight: bold;
    color: #FFFFFF;
`;

const TextoHeader = styled.h1`
    font-size: 2rem;
    margin: 0;
    font-family:'Slabo 27px', serif;
    text-align: center;
`;

//Para aplicar el css al header, se sustituye el elemento <header> por la variable creada
const Header = ({titulo}) => {
    return ( 
        <ContenedorHeader>
            <TextoHeader>{titulo}</TextoHeader>
        </ContenedorHeader>
     );
}
 
export default Header;