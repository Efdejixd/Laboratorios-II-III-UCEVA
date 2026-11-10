import { Router } from "express";

/** Configuración de opciones para el servidor. */
export interface Options {
  port: number;
  publicPath: string;
  routes: Router;
  database: Database;
}

export interface Database {
  dbPort: number;
  dbHost: string;
  dbUser: string;
  dbPassword: string;
  dbName: string;
}
