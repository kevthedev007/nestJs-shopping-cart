import { Body, Controller, NotFoundException, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import { Payment } from './entities/payment.entity';
import { PaymentsService } from './payments.service';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) { }

  @ApiCreatedResponse({ type: Payment })
  @ApiNotFoundResponse()
  @Post(':orderId')
  payment(@Param('orderId') orderId: number, @Body() shipping_address: CreatePaymentDto): Promise<Payment> {
    if (!orderId) {
      throw new NotFoundException()
    }
    return this.paymentsService.payment(orderId, shipping_address)
  }
}
