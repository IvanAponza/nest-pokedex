import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapter/axios.adapter';

@Injectable()
export class SeedService {
  
  //Todo: Adapter dependici 
  //Dependencia
  // private readonly axios: AxiosInstance = axios;

  //Injectamos el modelo para poder trabajar con la DB
  constructor(
      @InjectModel(Pokemon.name)//Nombre modelo a usar
      private readonly pokemonModel: Model<Pokemon>,

      //Injectamos axios adapter
      private readonly http: AxiosAdapter
    ){}

  async executeSeed() {

    //Elimina todos los pokemon cada vez que ejecuta el método
    await this.pokemonModel.deleteMany({});
    
    //Tipar la respuesta creamos interface para evitar errores de escritura 650
   const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

   //Insertar de manera simultanea si esperar a otras promesas
   const pokemonToInsert: { name: string, no: number}[] = [];

   //Extraer el ID de la URL
   data.results.forEach(async({name, url})=> {
    // console.log({name, url})

    //Obtener el no. del pokemon ---> cortamos url por /
    //como la penultima posición es el no. pokemon entonces
    const segments = url.split('/');
    // console.log(segments)
    const no = +segments[segments.length - 2];

    // const pokemon = await this.pokemonModel.create({name, no})
    // console.log({name, no});

    pokemonToInsert.push({name, no}); //[{name: bulbasor, no: 1}]
     
   });

   //Insert pokemon en DB
   await this.pokemonModel.insertMany(pokemonToInsert);

    // return data.results;
    return 'Seed Executed'
  }

}
