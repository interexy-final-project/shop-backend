import { Test, TestingModule } from '@nestjs/testing';
import { JeansTypeService } from './jeans-type.service';

describe('JeansTypeService', () => {
  let service: JeansTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JeansTypeService],
    }).compile();

    service = module.get<JeansTypeService>(JeansTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
