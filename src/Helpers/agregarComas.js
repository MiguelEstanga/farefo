
export default function agregarComas(numero) {
    const cadenaNumero = numero.toString();
    const parteEntera = cadenaNumero.split('.')[0]
    const parteDesimal = cadenaNumero.split('.')[1] ?? '00'
    const grupos = [];
    let grupoActual = '';
    for (let i = parteEntera.length - 1; i >= 0; i--) {
        grupoActual = cadenaNumero[i] + grupoActual;
        if (grupoActual.length === 3 || i === 0) {
            grupos.unshift(grupoActual);
            grupoActual = '' ;
        }
    }
    
    const parseSifra = `${grupos.join(',')}.${parteDesimal.substr(0,2)}`
    // Une los grupos con comas y devuelve el resultado
    return parseSifra ;
  }