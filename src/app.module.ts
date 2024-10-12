import { Module } from '@nestjs/common';
import { InstructorModule } from './instructor/instructor.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { CourseModule } from './course/course.module';

@Module({
  imports: [InstructorModule, AuthModule, CourseModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
