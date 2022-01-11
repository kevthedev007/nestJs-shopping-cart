import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CartsService } from './carts.service';
import { UpdateQuantityDto } from './dtos/update-quantity.dto';
import { Cart } from './entities/cart.entity';

@ApiTags('carts')
@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) { }

  @ApiOkResponse({ type: Cart })
  @ApiNotFoundResponse()
  @Post(':productId')
  addCartItem(@Param('productId') productId: number): Promise<Cart> {
    if (!productId) {
      throw new NotFoundException()
    }
    return this.cartsService.addToCart(productId);
  }

  @ApiOkResponse({ type: Cart })
  @ApiNotFoundResponse()
  @Delete('delete/:cartId')
  removeItemFromCart(@Param('cartId') cartId: number): Promise<Cart> {
    if (!cartId) {
      throw new NotFoundException()
    }
    return this.cartsService.removeFromCart(cartId);
  }

  @ApiOkResponse({ type: Cart })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @Put('quanity/:cartId')
  updateQuantity(@Param('cartId') cartId: number, @Body() quantity: UpdateQuantityDto): Promise<Cart> {
    if (!cartId) {
      throw new NotFoundException()
    }
    if (quantity.quantity == 0) {
      throw new BadRequestException()
    }
    return this.cartsService.updateQuantity(cartId, quantity)
  }

  @ApiOkResponse({ type: Cart })
  @Get()
  getAll(): Promise<Cart[]> {
    return this.cartsService.getAllCartItems()
  }
}
