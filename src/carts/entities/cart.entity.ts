import { ApiProperty } from "@nestjs/swagger";
import { type } from "os";
import { Product } from "src/products/entities/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cart {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column('int', { default: 1 })
    quantity: number;

    @ApiProperty()
    @Column({ type: 'real' })
    total_price: number

    @Column()
    productId: number;

    @ManyToOne(type => Product, product => product.carts, { onDelete: 'CASCADE' })
    product: Product;

}