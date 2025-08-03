import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    // console.log({value, metadata})

    //Validamos que el value sea un MongoID
    if( !isValidObjectId(value) ){
      throw new BadRequestException(`${value} is not a valid mongoID`);
    }
    return value;
  }
}
