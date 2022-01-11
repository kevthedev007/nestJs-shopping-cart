import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentsService {
    constructor(
        @InjectRepository(Payment) private paymentsRepository: Repository<Payment>,
        @InjectRepository(Order) private ordersRepository: Repository<Order>
    ) { }

    async payment(orderId: number): Promise<Payment> {
        try {
            //check if order exists and pending
            const order = await this.ordersRepository.findOne({
                where: { id: orderId, status: 'PENDING' }
            })

            //update order status
            order.status = 'CONFIRMED';
            await this.ordersRepository.save(order)

            return await this.paymentsRepository.save({
                price: order.total_amount,
                orderId: order.id
            })
        } catch (error) {
            throw new NotFoundException()
        }

    }
}
