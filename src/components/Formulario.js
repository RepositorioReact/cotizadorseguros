import React, {useState} from 'react';
import styled from '@emotion/styled';
import {obtenerDiferenciaYear, calcularMarca, obtenerPlan} from '../helper';

const Campo = styled.div`
    display:flex;
    margin-bottom:1rem;
    align-items:center;
`;

const Label = styled.label`
    flex:0 0 100px;
`;

const Select = styled.select`
    display:block;
    width:100%;
    padding:1rem;
    border:1px solid #e1e1e1;
    -webkit-appearance: none;
`;

const InputRadio = styled.input`
    margin:0 1rem;
`;

const Boton = styled.button`
    background-color:#00838F;
    font-size:16px;
    width:100%;
    padding:1rem;
    color:#fff;
    text-transform:uppercase;
    font-weight:bold;
    border:none;
    transition: background-color .3s ease;
    margin-top:2rem;

    &:hover{
        background-color:#26C6DA;
        cursor:pointer;
    }
`;

const Error = styled.div`
    background-color:red;
    color:white;
    padding:1rem;
    width:100%;
    text-align:center;
    margin-bottom:2rem;
`;

const Formulario = ({guardarResumen, guardarCargando}) => {

    //Creamos el useState para los diferentes campos del formulario. Con el state se hacen las funciones necesarias para el funcionamiento del mismo
    const [datos, guardarDatos] = useState({
        marca:'',
        year:'',
        plan:''
    });
    //Nuevo state para el error
    const [error, guardarError] = useState(false);//false es porque no hay error hasta que el usuario deja un elemento vacío al enviar

    //Extraer los valors del state con la variable datos para no ir llamando datos.marca, si no directamente llamar a marca
    const{marca, year, plan} = datos;

    //Leer los datos del formulario con el state guardarDatos y colocarlos en el state
    //Primero hacemos copias de los datos, y luego con el e obtenemos el valor de los nuevos datos
    const obtenerInformacion = e => {
        guardarDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }

    //Cuando el usuario presiona enviar/submit
    const cotizarSeguro = e =>{
        e.preventDefault();

        //comprobar que están los campos vacios o rellenos
        if(marca.trim() === '' || year.trim() === '' || plan.trim() === '' ){
            guardarError(true);
            return;
        }

        guardarError(false);

        //base del seguro en 2000 euros o dolares o lo que sea
        let resultado = 2000;

        //cada vez que el año sea mas cercano al actual es más barato, por lo que;
        //hay que obtener la diferencia de años
        const diferencia = obtenerDiferenciaYear(year);

        //por cada año hay que restar el 3%, para esto creamos un helper en src del workspace
        resultado -= ((diferencia * 3) * resultado) / 100;

        //Americano incrementa en 10%
        //Asiatico incrementa en 5%
        //Europeo incrementa en 30%
        resultado = calcularMarca(marca) * resultado;

        //Plan básico aumenta 20%
        //Plan completo aumenta 50%
        const incrementoPlan = obtenerPlan(plan);
        resultado = parseFloat(incrementoPlan * resultado).toFixed(2);

        //muestra el spinner y después de 3 segundos muestra el resultado
        guardarCargando(true);
        setTimeout(() =>{
            //quita el spinner
            guardarCargando(false);
            //Total del seguro, cotizacion será el nombre del hook en el objeto que vale lo que vale resultado
            //pasa la información al componente principal
            guardarResumen({
                cotizacion: Number(resultado),
                datos
            });
        }, 3000)
        
    }

    //en el form agregamos un evento para que nos lleve al cotizarSeguro
    return ( 
        <form
            onSubmit={cotizarSeguro}
        >
            {error ? <Error>Todos los campos son obligatorios</Error> : null}

            <Campo>
                <Label>Marca</Label>
                <Select
                    name="marca"
                    value={marca}
                    onChange={obtenerInformacion}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="americano">Americano</option>
                    <option value="europeo">Europeo</option>
                    <option value="asiatico">Asiatico</option>
                </Select>
            </Campo>
            <Campo>
                <Label>Año</Label>
                <Select
                    name="year"
                    value={year}
                    onChange={obtenerInformacion}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                </Select>
            </Campo>
            <Campo>
                <Label>Plan</Label>
                <InputRadio
                    type="radio"  
                    name="plan"
                    value="basico"  
                    checked={plan === "basico"}
                    onChange={obtenerInformacion}
                />Básico
                <InputRadio
                    type="radio"  
                    name="plan"
                    value="completo" 
                    checked={plan === "completo"} 
                    onChange={obtenerInformacion}
                />Completo
            </Campo>
            <Boton type="submit">Cotizar</Boton>
        </form>
     );
}
 
export default Formulario;