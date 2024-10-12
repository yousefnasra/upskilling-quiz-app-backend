import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Delete all existing records
  await prisma.instructor.deleteMany();
  await prisma.student.deleteMany();
  await prisma.course.deleteMany();

  // Create Instructors
  const instructorsPromises = Array.from({ length: 10 }).map(() => {
    return prisma.instructor.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    });
  });
  const instructors = await Promise.all(instructorsPromises);

  // Create Students
  const studentsPromises = Array.from({ length: 10 }).map(() => {
    return prisma.student.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    });
  });
  await Promise.all(studentsPromises);

  // Create Courses
  const coursesPromises = Array.from({ length: 10 }).map(() => {
    return prisma.course.create({
      data: {
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        instructorId: instructors[Math.floor(Math.random() * instructors.length)].id,
      },
    });
  });
  await Promise.all(coursesPromises);

  console.log('Seeding completed successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
