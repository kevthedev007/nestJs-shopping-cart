import { Controller, Get } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @ApiCreatedResponse({ type: Order })
  @Get('create-order')
  createOrder(): Promise<Order> {
    return this.ordersService.createOrder()
  }

  @ApiOkResponse({ type: Order })
  @Get('all-orders')
  getOrders(): Promise<Order[]> {
    return this.ordersService.findAllOrders()
  }
}
