import { Test, TestingModule } from '@nestjs/testing';
import { DemoRequestsController } from './demo-requests.controller';
import { DemoRequestsService } from './demo-requests.service';

describe('DemoRequestsController', () => {
  let controller: DemoRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DemoRequestsController],
      providers: [DemoRequestsService],
    }).compile();

    controller = module.get<DemoRequestsController>(DemoRequestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
