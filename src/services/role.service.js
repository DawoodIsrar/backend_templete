import prisma from '../config/db.js';

export const createRole = async (data) => {
  return prisma.role.create({ data });
};

export const assignRoleToUser = async (userId, roleId) => {
  return prisma.userRole.create({
    data: {
      userId,
      roleId,
    },
  });
};

export const getUserRoles = async (userId) => {
  return prisma.user.findUnique({
    where: { id: userId },
    include: {
      roles: {
        include: { role: true },
      },
    },
  });
};
