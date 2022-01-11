import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @ApiCreatedResponse({ type: Product })
  @Post('/add')
  createProduct(@Body() product: CreateProductDto): Promise<Product> {
    return this.productsService.createProduct(product);
  }

  @ApiOkResponse({ type: Product })
  @ApiNotFoundResponse()
  @Put('/:id')
  updateProduct(@Param('id') id: number, @Body() product: UpdateProductDto): Promise<Product> {
    if (!id) {
      throw new NotFoundException()
    }
    return this.productsService.updateProduct(id, product);
  }

  @ApiOkResponse({ type: Product, isArray: true })
  @Get()
  getProducts(): Promise<Product[]> {
    return this.productsService.findProducts();
  }

  @ApiOkResponse({ type: Product })
  @ApiNotFoundResponse()
  @Delete('/delete/:id')
  removeProduct(@Param('id') id: number): Promise<Product> {
    if (!id) {
      throw new NotFoundException()
    }
    return this.productsService.deleteProduct(id)
  }

}
