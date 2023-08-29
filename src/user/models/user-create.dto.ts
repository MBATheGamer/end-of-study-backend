import { Type } from "class-transformer";
import { IsDate, IsEmail, IsNotEmpty, IsNumberString, IsOptional, IsPhoneNumber, MaxLength, MinLength } from "class-validator";

export class UserCreateDto {
  @MinLength(8)
  @MaxLength(8)
  @IsNumberString()
  cin: string;
  
  @IsNotEmpty()
  @MinLength(3)
  firstName: string;

  @IsNotEmpty()
  @MinLength(3)
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  dateOfBirth?: Date;

  @IsPhoneNumber("TN")
  @IsOptional()
  mobile?: string;

  @IsOptional()
  address?: string;

  roleId: number;

  @IsOptional()
  classroomId?: number;
}