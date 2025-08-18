import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  
  //Todo: Adapter dependici 
  //Dependencia
  private readonly axios: AxiosInstance = axios;

  async executeSeed() {
    
    //Tipar la respuesta creamos interface para evitar errores de escritura 650
   const {data} = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10');

   //Extraer el ID de la URL
   data.results.forEach(({name, url})=> {
    // console.log({name, url})

    //Obtener el no. del pokemon ---> cortamos url por /
    //como la penultima posición es el no. pokemon entonces
    const segments = url.split('/');
    // console.log(segments)
    const no = +segments[segments.length - 2];
    console.log({name, no});
     
   })

    return data.results;
  }

}
