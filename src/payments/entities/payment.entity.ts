import { ApiProperty } from "@nestjs/swagger";
import { Order } from "src/orders/entities/order.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Payment {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({ type: 'real' })
    price: number;

    @Column()
    orderId: number;

    @OneToOne(() => Order, order => order.payment, { onDelete: 'CASCADE' })
    @JoinColumn()
    order: Order

    @ApiProperty()
    @Column({ default: 'CONFIRMED' })
    status: string;
}