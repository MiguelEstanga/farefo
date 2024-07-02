
export default function agregarComas(numero) {
    
    
    if( numero.length === 0) return '0.00';
    const cadenaNumero = numero?.toString();
    if (cadenaNumero.length === 0) {
      cadenaNumero = "0.00";
    }
  
    const partes = cadenaNumero.split(".");
    const parteEntera = partes[0];
    let parteDecimal = partes[1] || "00";
    // Redondear y rellenar la parte decimal
    parteDecimal = parteDecimal.slice(0, 2).padEnd(2, "0");
    const grupos = [];
    let grupoActual = "";
    for (let i = parteEntera.length - 1; i >= 0; i--) {
      grupoActual = parteEntera[i] + grupoActual;
      if (grupoActual.length === 3 || i === 0) {
        grupos.unshift(grupoActual);
        grupoActual = "";
      }
    }
  
    const resultado = grupos.join(",") + "." + parteDecimal;
    return resultado;
  }