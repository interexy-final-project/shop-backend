import { Test, TestingModule } from '@nestjs/testing';
import { FetchPropertiesService } from './fetch-properties.service';

describe('FetchPropertiesService', () => {
  let service: FetchPropertiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FetchPropertiesService],
    }).compile();

    service = module.get<FetchPropertiesService>(FetchPropertiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
