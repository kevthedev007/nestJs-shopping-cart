import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsAlpha, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateProductDto {

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @IsAlpha()
    size?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @IsAlpha()
    color?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    image_src?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    price?: number;
}
