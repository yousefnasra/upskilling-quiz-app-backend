import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterInstructorDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
