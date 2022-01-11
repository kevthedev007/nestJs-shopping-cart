import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dtos/create-order.dto';
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @ApiCreatedResponse({ type: Order })
  @Post('create-order')
  createOrder(@Body() order: CreateOrderDto): Promise<Order> {
    return this.ordersService.createOrder(order)
  }

  @ApiOkResponse({ type: Order })
  @Get('all-orders')
  getOrders(): Promise<Order[]> {
    return this.ordersService.findAllOrders()
  }
}
