export default function mostrarUltimosDigitosTarjeta(cadenaTarjeta) {
   
    
   // Extraer los primeros 14 caracteres
   const primerosDigitos = cadenaTarjeta.slice(0, 12);

   // Rellenar con asteriscos
   const digitosOcultos = primerosDigitos.replace(/./g, "*");
 
   // Extraer los últimos 4 caracteres
   const ultimosDigitos = cadenaTarjeta.slice(-4);
 
   // Unir los dígitos ocultos y los últimos dígitos
   const tarjetaFormateada = digitosOcultos + ultimosDigitos;
   
   let resultado = ""
   for (let i = 0; i < tarjetaFormateada.length; i++) {
        resultado += tarjetaFormateada[i];
        if ((i + 1) % 4 === 0) {
        resultado += " ";
        }
   }
   return resultado;
  
    
  }