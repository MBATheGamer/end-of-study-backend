import { IsEmail, IsNotEmpty, IsNumberString, MaxLength, MinLength } from "class-validator";

export class RegisterDTO {
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

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(16)
  password: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(16)
  passwordConfirm: string;
}