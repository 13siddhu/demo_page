import { Injectable } from '@nestjs/common';
import { CreateDemoRequestDto } from './dto/create-demo-request.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DemoRequestsService {
  constructor(private prisma: PrismaService) { }

  async create(createDemoRequestDto: CreateDemoRequestDto) {
    return this.prisma.demoRequest.create({
      data: createDemoRequestDto,
    });
  }
}
