import { pool } from "../../../config/database";
import { CustomError } from "../../../domain/errors/custom.error";
import { Professor, CreateProfessor, UpdateProfessor } from "../../../domain/interfaces/professor.interface";
export class ProfessorService {
  private throwDatabaseError(error: unknown): never {
    if (error && typeof error === "object" && "code" in error && error.code === "23505") {
      throw CustomError.conflict("Ya existe un registro con un valor único repetido");
    }
    throw error;
  }
  public async getAllProfessors(): Promise<Professor[]> {
    return (await pool.query<Professor>("SELECT * FROM professors ORDER BY id;")).rows;
  }
  public async getProfessorById(id:number): Promise<Professor | null> {
    return (await pool.query<Professor>("SELECT * FROM professors WHERE id = $1;", [id])).rows[0] ?? null;
  }
  public async createProfessor(value:CreateProfessor):Promise<Professor> {
    const sql="INSERT INTO professors (name, email, department, status) VALUES ($1, $2, $3, $4) RETURNING *;";
    let record: Professor | undefined;
    try {
      record=(await pool.query<Professor>(sql,[value.name, value.email, value.department, value.status])).rows[0];
    } catch (error) {
      this.throwDatabaseError(error);
    }
    if(!record) throw CustomError.internalServer("No se pudo crear el profesor");
    return record;
  }
  public async updateProfessor(id:number,value:UpdateProfessor):Promise<Professor> {
    const sql="UPDATE professors SET name = $1, email = $2, department = $3, status = $4 WHERE id=$5 RETURNING *;";
    let record: Professor | undefined;
    try {
      record=(await pool.query<Professor>(sql,[value.name, value.email, value.department, value.status,id])).rows[0];
    } catch (error) {
      this.throwDatabaseError(error);
    }
    if(!record) throw CustomError.notFound("No existe un profesor con ese id");
    return record;
  }
  public async deleteProfessor(id:number):Promise<boolean> {
    const result=await pool.query("DELETE FROM professors WHERE id=$1 RETURNING id;",[id]);
    if (result.rowCount === 0) throw CustomError.notFound("No existe un profesor con ese id");
    return true;
  }
}
