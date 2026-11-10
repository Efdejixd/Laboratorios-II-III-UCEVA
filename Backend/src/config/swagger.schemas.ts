/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       description: Representa un usuario del sistema
 *       required:
 *         - id
 *         - name
 *         - lastname
 *         - age
 *         - email
 *         - engineering
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         name:
 *           type: string
 *           example: Carlos
 *         lastname:
 *           type: string
 *           example: Ramírez
 *         age:
 *           type: number
 *           example: 22
 *         email:
 *           type: string
 *           format: email
 *           example: carlos.ramirez@example.com
 *         engineering:
 *           type: string
 *           enum:
 *             - Sistemas
 *             - Electronica
 *             - Biomedica
 *             - Industrial
 *             - Ambiental
 *           example: Sistemas
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       description: Representa un producto del sistema
 *       required:
 *         - id
 *         - name
 *         - category
 *         - price
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         name:
 *           type: string
 *           example: Leche entera
 *         category:
 *           type: string
 *           example: Lacteos
 *         price:
 *           type: number
 *           example: 4500
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Professor:
 *       type: object
 *       required: [name, email, department, status]
 *       properties:
 *         name: { type: string, example: Ana Pérez }
 *         email: { type: string, format: email, example: ana@uceva.edu.co }
 *         department: { type: string, example: Sistemas }
 *         status: { type: boolean, example: true }
 *     Classroom:
 *       type: object
 *       required: [name, building, capacity, status]
 *       properties:
 *         name: { type: string, example: A-101 }
 *         building: { type: string, example: Bloque A }
 *         capacity: { type: integer, example: 35 }
 *         status: { type: boolean, example: true }
 */
export {};
