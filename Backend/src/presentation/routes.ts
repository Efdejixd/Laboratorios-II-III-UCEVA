import { Router } from "express";
import { CourseRoutes } from "./modules/course/course.route";
import { StudentRoutes } from "./modules/student/student.routes";
import { ProfessorRoutes } from "./modules/professor/professor.routes";
import { ClassroomRoutes } from "./modules/classroom/classroom.routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    const apiRouter = Router();
    // Módulos existentes del repositorio base.
    apiRouter.use("/students", StudentRoutes.routes);
    apiRouter.use("/courses", CourseRoutes.routes);
    // Módulos independientes solicitados en el laboratorio II.
    apiRouter.use("/professors", ProfessorRoutes.routes);
    apiRouter.use("/classrooms", ClassroomRoutes.routes);
    router.use("/api", apiRouter);
    return router;
  }
}
