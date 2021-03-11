import { Test, TestingModule } from '@nestjs/testing';
import { ImService } from './im.service';

describe('ImService', () => {
  let service: ImService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImService],
    }).compile();

    service = module.get<ImService>(ImService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
