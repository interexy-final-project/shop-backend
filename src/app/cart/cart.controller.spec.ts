import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { ProductSizes } from 'app/products/enums/product-sizes.enum';
import { ProductColors } from 'app/products/enums/product-colors.enum';

describe('CartController', () => {
  let controller: CartController;
  let service: CartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [CartService],
    }).compile();

    controller = module.get<CartController>(CartController);
    service = module.get<CartService>(CartService);
  });

  it('should return cart item', async () => {
    const result = {
      id: 'test',
      userId: 'test',
      created: new Date(),
      updated: new Date(),
      productId: 'test',
      quantity: 1,
      size: ProductSizes.M,
      color: ProductColors.BLACK,
    };
    jest.spyOn(service, 'getCartItem').mockResolvedValue(result);

    expect(await controller.findOne('1')).toBe(result);
  });
});
