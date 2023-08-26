import { Test, TestingModule } from '@nestjs/testing';
import { JeansTypeController } from './jeans-type.controller';
import { JeansTypeService } from './jeans-type.service';

describe('JeansTypeController', () => {
  let controller: JeansTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JeansTypeController],
      providers: [JeansTypeService],
    }).compile();

    controller = module.get<JeansTypeController>(JeansTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
