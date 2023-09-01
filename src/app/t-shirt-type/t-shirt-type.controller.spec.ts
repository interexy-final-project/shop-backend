import { Test, TestingModule } from '@nestjs/testing';
import { TShirtTypeController } from './t-shirt-type.controller';

describe('TShirtTypeController', () => {
  let controller: TShirtTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TShirtTypeController],
    }).compile();

    controller = module.get<TShirtTypeController>(TShirtTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
