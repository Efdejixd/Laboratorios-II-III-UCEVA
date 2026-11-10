/**
 * @openapi
 * /api/professors:
 *   get:
 *     tags: [Professor]
 *     summary: Consultar todos los registros de professors
 *     responses:
 *       '200':
 *         description: Consulta exitosa
 *   post:
 *     tags: [Professor]
 *     summary: Crear registro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Professor'
 *     responses:
 *       '201':
 *         description: Registro creado
 *       '400':
 *         description: Error de validación
 * /api/professors/{id}:
 *   get:
 *     tags: [Professor]
 *     summary: Obtener registro por identificador
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       '200':
 *         description: Consulta exitosa
 *       '404':
 *         description: No encontrado
 *   put:
 *     tags: [Professor]
 *     summary: Actualizar registro completo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Professor'
 *     responses:
 *       '200':
 *         description: Actualizado
 *       '404':
 *         description: No encontrado
 *   delete:
 *     tags: [Professor]
 *     summary: Eliminar registro
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       '200':
 *         description: Eliminado
 *       '404':
 *         description: No encontrado
 */
import { Router } from "express";
import { ProfessorController } from "./professor.controller";
export class ProfessorRoutes {
 static get routes():Router {
   const router=Router(); const controller=new ProfessorController();
   router.get("/",controller.getAllProfessors);
   router.get("/:id",controller.getProfessorById);
   router.post("/",controller.createProfessor);
   router.put("/:id",controller.updateProfessor);
   router.delete("/:id",controller.deleteProfessor);
   return router;
 }
}
