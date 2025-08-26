import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { SeedModule } from 'src/seed/seed.module';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    MongooseModule.forFeature([
      //Definimos el modelo
      {
        name: Pokemon.name,
        schema: PokemonSchema,
      },
    ]),
  ],
  //Para poder utilizar el modelo de Mongoose en seed
  exports: [
    MongooseModule
  ]
})
export class PokemonModule {}
