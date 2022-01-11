import { Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';
import { Payment } from './entities/payment.entity';
import { PaymentsService } from './payments.service';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) { }

  @ApiCreatedResponse({ type: Payment })
  @ApiNotFoundResponse()
  @Get(':orderId')
  payment(@Param('orderId') orderId: number): Promise<Payment> {
    if (!orderId) {
      throw new NotFoundException()
    }
    return this.paymentsService.payment(orderId)
  }
}
