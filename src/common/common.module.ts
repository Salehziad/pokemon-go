// common/common.module.ts

import { Module } from '@nestjs/common';
import { StringValidationPipe } from './string-validation.pipe';

@Module({
  providers: [StringValidationPipe],
  exports: [StringValidationPipe], // Export the pipe
})
export class CommonModule {}
