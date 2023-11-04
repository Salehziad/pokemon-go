import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class StringValidationPipe implements PipeTransform<string> {
  transform(value: string, metadata: ArgumentMetadata) {
    if (isNaN(Number(value)) || !isFinite(Number(value))) {
      throw new BadRequestException('Invalid ID. ID must be a numeric string.');
    }
    return value;
  }
}
