import prisma from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// Register user with default role
export const registerUser = async ({ name, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  // Assign default "user" role
  const role = await prisma.role.findUnique({ where: { name: 'USER' } });
  if (role) {
    await prisma.userRole.create({
      data: { userId: user.id, roleId: role.id },
    });
  }

  return user;
};

// Login
export const loginUser = async ({ email, password }) => {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { roles: { include: { role: true } } },
  });

  if (!user) throw new Error('Invalid email or password');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid email or password');

  const roles = user.roles.map((r) => r.role.name);

  const token = jwt.sign(
    { userId: user.id, roles },
    JWT_SECRET,
    { expiresIn: '1d' }
  );

  return { token, user: { id: user.id, name: user.name, email: user.email, roles } };
};
