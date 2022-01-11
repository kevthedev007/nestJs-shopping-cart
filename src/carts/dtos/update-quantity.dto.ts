import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateQuantityDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    quantity: number;
}