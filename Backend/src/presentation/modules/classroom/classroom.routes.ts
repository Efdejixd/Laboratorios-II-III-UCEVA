/**
 * @openapi
 * /api/classrooms:
 *   get:
 *     tags: [Classroom]
 *     summary: Consultar todos los registros de classrooms
 *     responses:
 *       '200':
 *         description: Consulta exitosa
 *   post:
 *     tags: [Classroom]
 *     summary: Crear registro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Classroom'
 *     responses:
 *       '201':
 *         description: Registro creado
 *       '400':
 *         description: Error de validación
 * /api/classrooms/{id}:
 *   get:
 *     tags: [Classroom]
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
 *     tags: [Classroom]
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
 *             $ref: '#/components/schemas/Classroom'
 *     responses:
 *       '200':
 *         description: Actualizado
 *       '404':
 *         description: No encontrado
 *   delete:
 *     tags: [Classroom]
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
import { ClassroomController } from "./classroom.controller";
export class ClassroomRoutes {
 static get routes():Router {
   const router=Router(); const controller=new ClassroomController();
   router.get("/",controller.getAllClassrooms);
   router.get("/:id",controller.getClassroomById);
   router.post("/",controller.createClassroom);
   router.put("/:id",controller.updateClassroom);
   router.delete("/:id",controller.deleteClassroom);
   return router;
 }
}
