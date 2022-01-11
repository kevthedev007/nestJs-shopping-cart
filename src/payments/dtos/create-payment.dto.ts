import { ApiProperty } from "@nestjs/swagger";
import { IsAlpha, IsNotEmpty, IsString } from "class-validator";

export class CreatePaymentDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    shipping_address: string;
}