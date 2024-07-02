export default function SepararDigitos(cadena)
{
    let resultado = "";

    if(cadena.length === 0)
    {
        cadena = ''
    }
    for (let i = 0; i < cadena.length; i++) {
        resultado += cadena[i];
        if ((i + 1) % 4 === 0) {
            resultado += " ";
        }
    }
    return resultado;
}