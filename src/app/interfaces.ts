export interface IUsuario{
    "id": number,
    "nombre": string,
    "apellidos": string,
    "email": string,
}
export interface IUsuarioCreate{
    "id": number,
    "nombre": string,
    "apellidos": string,
    "email": string,
}

export interface ILogUsuario{
    "email": string,
}