import React, {Fragment} from 'react';
import styled from '@emotion/styled';
import {primerMayuscula} from '../helper';

const ContenedorResumen = styled.div`
    padding:1rem;
    text-align:center;
    background-color:#00838f;
    color:#fff;
    margin-top:1rem;
`;

const Resumen = ({datos}) => {

    //Extraer datos
    const {marca, year, plan} = datos;

    //Al retornar null, no se carga el siguiente return con el h2 de Resumen de cotización
    if(marca === '' || year === '' || plan === ''){
        return null;
    }

    return ( 
        <ContenedorResumen>
            <h2>Resumen de cotización</h2>
            <ul>
                <li>Marca: {primerMayuscula(marca)}</li>
                <li>Plan: {primerMayuscula(plan)}</li>
                <li>Año del auto: {year}</li>
            </ul>
        </ContenedorResumen>
     );
}
 
export default Resumen;