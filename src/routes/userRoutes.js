import express from 'express';
import { getUsers} from '../controllers/userController.js';

const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Returns a list of users
 *     responses:
 *       200:
 *         description: A list of users
 */
router.get('/users', getUsers);



export default router;
