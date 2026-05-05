import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { DemoRequestsModule } from './demo-requests/demo-requests.module';

@Module({
  imports: [PrismaModule, DemoRequestsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
