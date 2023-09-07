import { Module } from '@nestjs/common';
import { ShippingAddressService } from './shipping-address.service';
import { ShippingAddressController } from './shipping-address.controller';
import { ShippingAddressRepo } from './repo/shipping-address.repo';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ShippingAddressEntity } from './entities/shipping-address.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [ShippingAddressEntity],
    }),
  ],
  controllers: [ShippingAddressController],
  providers: [ShippingAddressService, ShippingAddressRepo],
})
export class ShippingAddressModule {}
