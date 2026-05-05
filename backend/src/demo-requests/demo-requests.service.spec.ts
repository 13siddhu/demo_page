import { Test, TestingModule } from '@nestjs/testing';
import { DemoRequestsService } from './demo-requests.service';

describe('DemoRequestsService', () => {
  let service: DemoRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DemoRequestsService],
    }).compile();

    service = module.get<DemoRequestsService>(DemoRequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
