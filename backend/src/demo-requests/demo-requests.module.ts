import { Module } from '@nestjs/common';
import { DemoRequestsService } from './demo-requests.service';
import { DemoRequestsController } from './demo-requests.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DemoRequestsController],
  providers: [DemoRequestsService],
})
export class DemoRequestsModule { }
