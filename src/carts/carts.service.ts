import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { UpdateQuantityDto } from './dtos/update-quantity.dto';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartsService {
    constructor(
        @InjectRepository(Cart) private cartsRepository: Repository<Cart>,
        @InjectRepository(Product) private productsRepository: Repository<Product>
    ) { }

    async addToCart(id: number): Promise<Cart> {
        try {
            //check if product id exists
            const checkProduct = await this.productsRepository.findOneOrFail(id)

            //check if product exists in cart
            const cartItem = await this.cartsRepository.findOne({
                where: { productId: checkProduct.id },
                relations: ['product']
            });

            if (!cartItem) {
                //if not, create one
                await this.cartsRepository.save({
                    quantity: 1,
                    total_price: checkProduct.price,
                    productId: id
                })
                return await this.cartsRepository.findOne({
                    where: { productId: id },
                    relations: ['product']
                })
            } else {
                //if it does , update quantity
                cartItem.quantity = cartItem.quantity + 1;
                cartItem.total_price = cartItem.quantity * checkProduct.price;
                return await this.cartsRepository.save(cartItem);
            }
        } catch (error) {
            throw new NotFoundException()
        }
    }

    async removeFromCart(cartId: number): Promise<Cart> {
        try {
            //check if cart id exists
            const cartItem = await this.cartsRepository.findOneOrFail({
                where: { id: cartId },
                relations: ['product']
            })

            //get product price
            // const product = await this.productsRepository.findOne(cartItem.product)

            if (cartItem.quantity > 1) {
                cartItem.quantity = cartItem.quantity - 1;
                cartItem.total_price = cartItem.quantity * cartItem.product.price;
                return await this.cartsRepository.save(cartItem);
            } else {
                return await this.cartsRepository.remove(cartItem)
            }

        } catch (error) {
            throw new NotFoundException()
        }
    }

    async updateQuantity(id: number, quantity: UpdateQuantityDto): Promise<Cart> {
        try {
            //check if cart id exists
            const cartItem = await this.cartsRepository.findOneOrFail({
                where: { id },
                relations: ['product']
            })

            cartItem.quantity = quantity.quantity;
            cartItem.total_price = cartItem.quantity * cartItem.product.price;
            return await this.cartsRepository.save(cartItem);
            // await this.cartsRepository.update(id, quantity)
            // return await this.cartsRepository.findOne(id)
        } catch (error) {
            throw new NotFoundException()
        }
    }

    async getAllCartItems(): Promise<Cart[]> {
        return await this.cartsRepository.find({
            relations: ['product']
        })
    }
}