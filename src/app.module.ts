import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// ========== config ==========
import app_config from './config/app.config';
import database_config from './config/database.config';

import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ProductsModule } from 'app/products/products.module';
import { AuthModule } from 'app/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CartModule } from 'app/cart/cart.module';
import { OrderModule } from 'app/order/order.module';
import { OrderItemModule } from 'app/order-item/order-item.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [app_config, database_config],
      isGlobal: true,
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    ProductsModule,
    CartModule,
    OrderModule,
    OrderItemModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
