
//Exposrtamos una función para mapear las variables de entorno encaso de que no vengan las carga por default

export const EnvConfiguration =()=>({
    enviroment: process.env.NODE_ENV || 'dev', //si no viene por defaul será 'dev', la cual nos dirá si estamos en prod | dev | test.
    mongodb: process.env.MONGODB,
    port: process.env.PORT || 3001,
    defaultLimit: process.env.DEFAULT_LIMIT || 6,
})