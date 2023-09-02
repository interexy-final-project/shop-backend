import { Test, TestingModule } from '@nestjs/testing';
import { FetchPropertiesController } from './fetch-properties.controller';
import { FetchPropertiesService } from './fetch-properties.service';

describe('FetchPropertiesController', () => {
  let controller: FetchPropertiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FetchPropertiesController],
      providers: [FetchPropertiesService],
    }).compile();

    controller = module.get<FetchPropertiesController>(FetchPropertiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
