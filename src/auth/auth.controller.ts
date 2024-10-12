import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterInstructorDto } from './dto/instructor/register.dto';
import { Instructor, Student } from '@prisma/client';
import { LoginInstructorDto } from './dto/instructor/login.dto';
import { RegisterStudentDto } from './dto/student/register.dto';
import { LoginStudentDto } from './dto/student/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // & INSTRUCTOR
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
  // & STUDENT
  // * /auth/student/register
  /**
   * @description Register a new student
   * @param {RegisterStudentDto} dto
   * @returns {Promise<Student>}
   */
  @Post('student/register')
  registerStudent(@Body() dto: RegisterStudentDto): Promise<Partial<Student>> {
    return this.authService.registerStudent(dto);
  }
  // * /auth/student/login
  /**
   * @description Login an student
   * @param {LoginStudentDto} dto
   * @returns {Promise<{
   * instructor: Partial<Student>;
   * access_token: string;
   * }>}
   */
  @Post('student/login')
  loginStudent(@Body() dto: LoginStudentDto): Promise<{
    student: Partial<Student>;
    access_token: string;
  }> {
    return this.authService.loginStudent(dto);
  }
}
