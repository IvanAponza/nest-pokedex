import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';

import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import {PiginationDto} from 'src/common/dto/pagination.dto';

@Injectable()
export class PokemonService {
  
  constructor(
    @InjectModel(Pokemon.name)//Nombre modelo a usar
    private readonly pokemonModel: Model<Pokemon>,
  ){}
 
  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto)
      return pokemon;
      
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll(paginationDto: PiginationDto) {

    const { limit = 10, offset = 0 } = paginationDto;

    return this.pokemonModel.find()
      .limit(limit)
      .skip(offset)
      .sort({
        no: 1
      }) //Ordena por No. ASC
      .select('-__v')//Quita __v de mongo
  }

  //term para buscar por ID, NOMBRE o NO.
  async findOne(term: string) {
    let pokemon: Pokemon | null = null;

    //Busca por no
    if(!isNaN(+term)){
      pokemon = await this.pokemonModel.findOne({no: term});
    }

    //Busca por MongoID
    if(!pokemon && isValidObjectId(term)){
      pokemon = await this.pokemonModel.findById(term);
    }

    // Busca por Nombre
    if(!pokemon){
      pokemon = await this.pokemonModel.findOne({name: term.toLowerCase()})
    }

    //Si no se encuentra nada
    if(!pokemon)
      throw new NotFoundException(`Pokemon whith id, name or no"${term}" not found`);

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    
    const pokemon = await this.findOne(term);
  
   if(updatePokemonDto.name){
    updatePokemonDto.name = updatePokemonDto.name.toLowerCase()
   }

   try {
     await pokemon.updateOne(updatePokemonDto);
     return {...pokemon.toJSON(), ...updatePokemonDto};
   } catch (error) {
    this.handleExceptions(error);
   }
  }

  async remove(id: string) {
    // const pokemon = await this.findOne(id);
    // await pokemon.deleteOne();//Evita hacer dos consulta DB
    // return {id}

    // const result = await this.pokemonModel.findByIdAndDelete(id);

    //Eliminar en una sola consulta
    const {deletedCount} = await this.pokemonModel.deleteOne({_id: id});
    if(deletedCount === 0) 
      throw new BadRequestException(`Pokemon with id "${id}" not found`);
    return;
  }

  fillPokemonWithSeedData(){
    
  }
  
  //Metodo para manejar errores no controlados
  private handleExceptions(error: any){
    if(error.code === 11000){
      throw new BadRequestException(`Pokemon exists in DB ${JSON.stringify(error.keyValue)}`);
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`);
  }
}
