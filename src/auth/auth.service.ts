import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterInstructorDto } from './dto/instructor/register.dto';
import * as bcrypt from 'bcryptjs';
import { Instructor } from '@prisma/client';
import { LoginInstructorDto } from './dto/instructor/login.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly JwtService: JwtService,
  ) {}

  // * registerInstructor
  /**
   * @description Register a new instructor
   * @param {RegisterInstructorDto} dto
   * @returns {Promise<Instructor>}
   */
  async registerInstructor(
    dto: RegisterInstructorDto,
  ): Promise<Partial<Instructor>> {
    // check if instructor already exist
    const existingInstructor = await this.prisma.instructor.findUnique({
      where: { email: dto.email },
    });
    if (existingInstructor) {
      throw new ConflictException('Instructor alraedy exists!');
    }
    // hash instructor password
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    // create new instructor
    const createdInstructor = await this.prisma.instructor.create({
      data: { ...dto, password: hashedPassword },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    // send response
    return createdInstructor;
  }
  // * loginInstructor
  /**
   * @description Login an instructor
   * @param {LoginInstructorDto} dto
   * @returns {Promise<{
   * instructor: Partial<Instructor>;
   * access_token: string;
   * }>}
   */
  async loginInstructor(dto: LoginInstructorDto): Promise<{
    instructor: Partial<Instructor>;
    access_token: string;
  }> {
    // check if instructor not exist
    const instructor = await this.prisma.instructor.findUnique({
      where: { email: dto.email },
    });
    if (!instructor) throw new NotFoundException('Instructor not found!');

    // check if password correct
    const isPasswordValid = await bcrypt.compare(
      dto.password,
      instructor.password,
    );
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid Email or Password!');
    // create token
    const payload = {
      id: instructor.id,
      name: instructor.name,
      email: instructor.email,
    };
    const token = this.JwtService.sign(payload);
    // send response
    return {
      instructor: {
        id: instructor.id,
        name: instructor.name,
        email: instructor.email,
        createdAt: instructor.createdAt,
        updatedAt: instructor.updatedAt,
      },
      access_token: token,
    };
  }
}
