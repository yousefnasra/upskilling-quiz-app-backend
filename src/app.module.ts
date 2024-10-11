import { Module } from '@nestjs/common';
import { InstructorModule } from './instructor/instructor.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [InstructorModule, AuthModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
