import { IsNotEmpty, IsOptional, IsArray } from "class-validator";

export class UpdatePollDto {
    @IsOptional()
    @IsNotEmpty()
    title: string;

    @IsOptional()
    @IsArray()
    options: string[];
}