import {
  IsNotEmpty,
  IsArray,
  IsDateString,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreatePollDto {
  @IsNotEmpty()
  title: string;

  @IsArray()
  options: string[];

  @IsBoolean()
  isPrivate: boolean;

  @IsNotEmpty()
  allowedUsers: string;

  @IsDateString()
  expiryTime: string;
}
