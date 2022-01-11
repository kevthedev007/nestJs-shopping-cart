import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateOrderDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    delivery: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    discount: number;
}