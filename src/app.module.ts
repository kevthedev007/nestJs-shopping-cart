import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CartsModule } from './carts/carts.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import config from 'ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    ProductsModule,
    CartsModule,
    OrdersModule,
    PaymentsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
