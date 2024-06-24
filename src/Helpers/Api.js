export const URL={
    UrlBase:"https://api1-dev.parabilium.com/wsAppConnect_FR_SB/api/",
    
}

export const endpoint = {
    LOGIN:`${URL.UrlBase}LogIn/`,
    OBTENER_DATOS_DE_LA_TAJETA2:`${URL.UrlBase}ObtenerDatosTarjeta`,
    OBTENER_DATOS_DE_LA_TAJETA:"ObtenerDatosTarjeta/",
    COMISION:`${URL.UrlBase}ConsultaComisionesSPEI/`,
    TRANSFERENCIA:`${URL.UrlBase}SPEIOutExterno/`,
}

export const headers = {
    "Content-Type": "application/json",
    Credenciales: "R2VuZXJpY1VzZXI6RG51LjEyMw==",
};