import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/carts/entities/cart.entity';
import { getRepository, Repository } from 'typeorm';
import { CreateOrderDto } from './dtos/create-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order) private ordersRepository: Repository<Order>,
        @InjectRepository(Cart) private cartsRepository: Repository<Cart>
    ) { }

    async createOrder(order: CreateOrderDto): Promise<any> {
        const { sum } = await getRepository(Cart)
            .createQueryBuilder("cart")
            .select("SUM(cart.total_price)", "sum")
            .getRawOne()
        const items = await this.cartsRepository.find({ relations: ['product'] })
        const orderDetails = await this.ordersRepository.save({
            delivery: order.delivery,
            discount: order.discount,
            total_amount: sum + order.delivery - order.discount
        })
        return { orderDetails, items }
    }

    async findAllOrders(): Promise<Order[]> {
        return await this.ordersRepository.find()
    }
}
