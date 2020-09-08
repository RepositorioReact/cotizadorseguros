//Toma por parámetro el año que el usuario le está pasando
//al año actual se le resta el año seleccionado por el usuario
export function obtenerDiferenciaYear(year){
    return new Date().getFullYear() - year;
}

//Calcula el total a pagar según la marca
export function calcularMarca(marca){
    let incrimento;

    switch(marca){
        case "europeo":
            incrimento = 1.30; //el 30% de lo que llevemos, no de los primeros 2000
            break;
        case "americano":
            incrimento = 1.15;
            break;
        case "asiatico":
            incrimento = 1.05;
            break;
        default:
            break;
    }

    return incrimento;
}

//calcula el tipo de seguro
export function obtenerPlan(plan){
    return(plan === "basico" ? 1.20 : 1.50); //si el plan es básico, incrementa en 1.20, si no, directamente es completo e incrementa en 1.50
}

//Para que ponga la primera letra en mayúscula a la marca y al plan
export function primerMayuscula(texto){
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}