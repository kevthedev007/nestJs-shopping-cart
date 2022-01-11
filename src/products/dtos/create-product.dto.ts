import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsAlpha, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsAlpha()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsAlpha()
    size: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsAlpha()
    color: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    image_src: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    price: number;
}
