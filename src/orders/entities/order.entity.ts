import { ApiProperty } from "@nestjs/swagger";
import { Payment } from "src/payments/entities/payment.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column({ type: 'real' })
    total_amount: number

    @ApiProperty()
    @Column({ default: "PENDING" })
    status: string;

    @OneToOne(() => Payment, payment => payment.order)
    payment: Payment

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}