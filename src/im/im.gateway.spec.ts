import { Test, TestingModule } from '@nestjs/testing';
import { ImGateway } from './im.gateway';

describe('ImGateway', () => {
  let gateway: ImGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImGateway],
    }).compile();

    gateway = module.get<ImGateway>(ImGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
