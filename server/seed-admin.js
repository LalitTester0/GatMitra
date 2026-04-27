import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminUsername = 'admin';
  const rawPassword = 'superpassword123';
  
  const existingAdmin = await prisma.superAdmin.findUnique({
    where: { username: adminUsername }
  });

  if (existingAdmin) {
    console.log(`SuperAdmin '${adminUsername}' already exists.`);
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(rawPassword, salt);

  await prisma.superAdmin.create({
    data: {
      username: adminUsername,
      passwordHash: passwordHash
    }
  });

  console.log(`✅ SuperAdmin '${adminUsername}' created successfully!`);
  console.log(`🔑 Username: ${adminUsername}`);
  console.log(`🔑 Password: ${rawPassword}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
