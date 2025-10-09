<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Description

Repositorio aplicación PokeDex con NestJs, MongoDB, Mongoose.

## 1. Clonar el repositorio

## 2. Tener Nest CLI instalado

```bash
npm i -g @nestjs/cli
```

## 3. Instalar las dependencias

```bash
#Con Yarn
yarn install

#Con Npm
npm install
```

## 4. Clonar y configurar las variables de entorno

```bash
cp env.template .env
```

## 5. Ejecutar el Proyecto

```bash
# Modo desarrollo
yarn run start

# Modo desarrollo watch
yarn run start:dev

# Modo produción
yarn run start:prod
```

## 6. Levantar la base de datos

En caso de necesitar base de datos, configurar el docker-compose.yml y ejecutar

```bash
docker compose up -d
```

## 7. Reconstruir la base de datos con la semilla

```bash
http://localhost:3000/api/v2/seed
```

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
