import React, {useState} from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Resumen from './components/Resumen';
import Resultado from './components/Resultado';
import Spinner from './components/Spinner';
import styled from '@emotion/styled';

const Contenedor = styled.div`
  max-width:600px;
  margin:0 auto;
`;

const ContenedorFormulario = styled.div`
  background-color:#FFF;
  padding:3rem;
`;

function App() {

  //Este resumen guarda los datos del formulario que es un objeto, por lo que se inicia como objeto vacío con las variables de datos vacias. La variable resumen se pasará a otros componentes, en este caso resumen ahora es igual a datos
  //lo añadimo como props en el formulario para llamarlo desde Formulario.js para usarlo en el Total después de haber obtenido el resultado
  const [resumen, guardarResumen] = useState({
    cotizacion: 0,
    datos: {
      marca:'',
      year:'',
      plan:''
    }
  })

  //Para la aparción del spinner de carga
  //el guardarCargando se pasa al Formulario como un prop, para que cuando este cargue, se quite la animación en la zona de guardarResumen
  const [cargando, guardarCargando] = useState(false);//la primera vez no carga y por eso es false

  //Extraemos datos para pasarlo a Formulario
  const {datos, cotizacion} = resumen;


  return (
    <Contenedor>
        <Header 
          titulo = 'Cotizador de seguros'
        />
        <ContenedorFormulario>
          <Formulario 
            guardarResumen = {guardarResumen}
            guardarCargando = {guardarCargando}
          />
          {cargando ? <Spinner /> : null}
          <Resumen 
            datos={datos}
          />
          {!cargando 
            ? 
              <Resultado 
                cotizacion={cotizacion}
              />
            : null
          }
        </ContenedorFormulario>
    </Contenedor>
  );
}

export default App;
