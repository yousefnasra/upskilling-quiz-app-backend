import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Delete all existing records
  await prisma.instructor.deleteMany();
  await prisma.student.deleteMany();

  // Create Instructors
  for (let i = 0; i < 10; i++) {
    await prisma.instructor.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    });
  }

  // Create Students
  for (let i = 0; i < 10; i++) {
    await prisma.student.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    });
  }
  console.log('seeding completed successfully');

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
