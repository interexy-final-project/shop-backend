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

import { HeaderResolver, I18nModule } from 'nestjs-i18n';
import * as path from 'path';

import { JeansTypeModule } from './app/jeans-type/jeans-type.module';
import { TShirtTypeModule } from './app/t-shirt-type/t-shirt-type.module';
import { CartModule } from 'app/cart/cart.module';
import { OrderModule } from 'app/order/order.module';
import { OrderItemModule } from 'app/order-item/order-item.module';
import { ShirtTypeModule } from 'app/shirt-type/shirt-type.module';
import { FetchPropertiesModule } from './app/fetch-properties/fetch-properties.module';

@Module({
  imports: [
    AuthModule,
    CartModule,
    OrderModule,
    OrderItemModule,
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

    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [new HeaderResolver(['x-lang'])],
    }),

    JeansTypeModule,
    AuthModule,
    TShirtTypeModule,
    ShirtTypeModule,
    FetchPropertiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
