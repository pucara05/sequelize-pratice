import express from 'express';
import { createUser, getUsers, getUserById, udapteUser, deleteUser} from '../../controllers/v1/userController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Usersv1
 *   description: API para gestionar usuarios
 */


/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente.
 *       400:
 *         description: Error al crear el usuario.
 */
router.post('/users', createUser);





/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Obtiene la lista de todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   email:
 *                     type: string
 */
router.get('/users', getUsers);




/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario obtenido exitosamente.
 *       404:
 *         description: Usuario no encontrado.
 */
router.get('/users/:id', getUserById );

/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     summary: Actualiza un usuario existente
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente.
 *       404:
 *         description: Usuario no encontrado.
 */
router.put('/users/:id',udapteUser );



/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Elimina un usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       204:
 *         description: Usuario eliminado exitosamente.
 *       404:
 *         description: Usuario no encontrado.
 */

router.delete('/users/:id', deleteUser);




export default router;
