import cors from "cors";
import express, { Router } from "express";
import path from "path";
import swaggerUi from 'swagger-ui-express';
import { pool } from "../config/database";
import { swaggerSpec } from '../config/swagger';
import { Options } from "../domain/interfaces/server.interface";

/** Clase que centraliza la configuración y el arranque del servidor Express. */
export class Server {
  public readonly app = express();
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;
  constructor(options: Options) {
    const { port, publicPath, routes } = options;
    this.port = port;
    this.publicPath = publicPath;
    this.routes = routes;
  }
  async start(): Promise<void> {
    this.databaseConnect();
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static(this.publicPath));
    this.app.use(this.routes);
    this.app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    this.app.use((req, res) => {
      res.sendFile(path.join(__dirname, `../../${this.publicPath}/index.html`));
    });
    this.app.listen(this.port, () => {
      console.log(`Server Running on Port ${this.port}`);
    });
  }
  async databaseConnect(){
    try {
      await pool.query("SELECT 1");
      console.log("Conexión a PostgreSQL establecida correctamente");
    } catch (error) {
      console.error("Error al conectar con PostgreSQL:", error);
      throw error;
    }
  }
}
