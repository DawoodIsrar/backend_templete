import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { createRole, assignRole, getUserRoles } from "../controllers/role.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Roles
 *     description: Role management APIs (Admin restricted)
 */

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Create a new role
 *     description: Only **ADMIN** can create roles.
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "ADMIN"
 *     responses:
 *       201:
 *         description: Role created successfully
 *       403:
 *         description: Forbidden - Only ADMIN can perform this action
 */
router.post("/", authenticate, authorize("ADMIN"), createRole);

/**
 * @swagger
 * /roles/assign:
 *   post:
 *     summary: Assign a role to a user
 *     description: Only **ADMIN** can assign roles to users.
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - roleId
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               roleId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Role assigned successfully
 *       403:
 *         description: Forbidden - Only ADMIN can perform this action
 */
router.post("/assign", authenticate, authorize("ADMIN"), assignRole);

/**
 * @swagger
 * /roles/{userId}:
 *   get:
 *     summary: Get all roles for a user
 *     description: **ADMIN** can view any user’s roles, **USER** can only view their own.
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: "ID of the user"
 *     responses:
 *       200:
 *         description: List of roles for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                     example: "USER"
 *       403:
 *         description: Forbidden - User does not have permission
 */
router.get("/:userId", authenticate, authorize("ADMIN", "USER"), getUserRoles);

export default router;
