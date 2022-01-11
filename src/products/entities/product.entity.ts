import { ApiProperty } from '@nestjs/swagger';
import { type } from 'os';
import { Cart } from 'src/carts/entities/cart.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {

  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  size: string;

  @ApiProperty()
  @Column()
  color: string;

  @ApiProperty()
  @Column()
  image_src: string;

  @ApiProperty()
  @Column({ type: 'real' })
  price: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(type => Cart, cart => cart.product)
  carts: Cart[]
}
