import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/carts/entities/cart.entity';
import { getRepository, Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order) private ordersRepository: Repository<Order>,
        @InjectRepository(Cart) private cartsRepository: Repository<Cart>
    ) { }

    async createOrder(): Promise<any> {
        const { sum } = await getRepository(Cart)
            .createQueryBuilder("cart")
            .select("SUM(cart.total_price)", "sum")
            .getRawOne()
        const items = await this.cartsRepository.find({ relations: ['product'] })
        const orderDetails = await this.ordersRepository.save({ total_amount: sum })
        return { orderDetails, items }
    }

    async findAllOrders(): Promise<Order[]> {
        return await this.ordersRepository.find()
    }
}
