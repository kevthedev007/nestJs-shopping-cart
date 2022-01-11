import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
	constructor(
		@InjectRepository(Product) private productsRepository: Repository<Product>) { }

	async createProduct(product: CreateProductDto): Promise<Product> {
		const newProduct = await this.productsRepository.save(product);
		return newProduct;
	}

	async updateProduct(id: number, product: UpdateProductDto): Promise<Product> {
		try {
			const checkProduct = await this.productsRepository.findOneOrFail(id)
			await this.productsRepository.update(id, product);
			return await this.productsRepository.findOne(id)
		} catch (error) {
			throw new NotFoundException()
		}
	}

	async findProducts(): Promise<Product[]> {
		return await this.productsRepository.find();
	}

	async deleteProduct(id: number): Promise<Product> {
		try {
			const product = await this.productsRepository.findOneOrFail(id)
			return await this.productsRepository.remove(product)
		} catch (error) {
			throw new NotFoundException()
		}
	}
}
