import * as roleService from '../services/role.service.js';

export const createRole = async (req, res) => {
  try {
    const role = await roleService.createRole(req.body);
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const assignRole = async (req, res) => {
  try {
    const { userId, roleId } = req.body;
    const userRole = await roleService.assignRoleToUser(userId, roleId);
    res.status(201).json(userRole);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserRoles = async (req, res) => {
  try {
    const { userId } = req.params;
    const userWithRoles = await roleService.getUserRoles(Number(userId));
    res.status(200).json(userWithRoles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
