import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterInstructorDto } from './dto/instructor/register.dto';
import { Instructor } from '@prisma/client';
import { LoginInstructorDto } from './dto/instructor/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // * /auth/instructor/register
  /**
   * @description Register a new instructor
   * @param {RegisterInstructorDto} dto
   * @returns {Promise<Instructor>}
   */
  @Post('instructor/register')
  registerInstructor(
    @Body() dto: RegisterInstructorDto,
  ): Promise<Partial<Instructor>> {
    return this.authService.registerInstructor(dto);
  }
  // * /auth/instructor/login
  /**
   * @description Login an instructor
   * @param {LoginInstructorDto} dto
   * @returns {Promise<{
   * instructor: Partial<Instructor>;
   * access_token: string;
   * }>}
   */
  @Post('instructor/login')
  loginInstructor(@Body() dto: LoginInstructorDto): Promise<{
    instructor: Partial<Instructor>;
    access_token: string;
  }> {
    return this.authService.loginInstructor(dto);
  }
}
