import { Test, TestingModule } from '@nestjs/testing';
import { TShirtTypeService } from './t-shirt-type.service';

describe('TShirtTypeService', () => {
  let service: TShirtTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TShirtTypeService],
    }).compile();

    service = module.get<TShirtTypeService>(TShirtTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
