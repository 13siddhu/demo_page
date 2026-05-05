import { PartialType } from '@nestjs/mapped-types';
import { CreateDemoRequestDto } from './create-demo-request.dto';

export class UpdateDemoRequestDto extends PartialType(CreateDemoRequestDto) {}
