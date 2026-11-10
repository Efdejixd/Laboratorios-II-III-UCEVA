import { pool } from "../../../config/database";
import { CustomError } from "../../../domain/errors/custom.error";
import { Classroom, CreateClassroom, UpdateClassroom } from "../../../domain/interfaces/classroom.interface";
export class ClassroomService {
  private throwDatabaseError(error: unknown): never {
    if (error && typeof error === "object" && "code" in error && error.code === "23505") {
      throw CustomError.conflict("Ya existe un registro con un valor único repetido");
    }
    throw error;
  }
  public async getAllClassrooms(): Promise<Classroom[]> {
    return (await pool.query<Classroom>("SELECT * FROM classrooms ORDER BY id;")).rows;
  }
  public async getClassroomById(id:number): Promise<Classroom | null> {
    return (await pool.query<Classroom>("SELECT * FROM classrooms WHERE id = $1;", [id])).rows[0] ?? null;
  }
  public async createClassroom(value:CreateClassroom):Promise<Classroom> {
    const sql="INSERT INTO classrooms (name, building, capacity, status) VALUES ($1, $2, $3, $4) RETURNING *;";
    let record: Classroom | undefined;
    try {
      record=(await pool.query<Classroom>(sql,[value.name, value.building, value.capacity, value.status])).rows[0];
    } catch (error) {
      this.throwDatabaseError(error);
    }
    if(!record) throw CustomError.internalServer("No se pudo crear el salón");
    return record;
  }
  public async updateClassroom(id:number,value:UpdateClassroom):Promise<Classroom> {
    const sql="UPDATE classrooms SET name = $1, building = $2, capacity = $3, status = $4 WHERE id=$5 RETURNING *;";
    let record: Classroom | undefined;
    try {
      record=(await pool.query<Classroom>(sql,[value.name, value.building, value.capacity, value.status,id])).rows[0];
    } catch (error) {
      this.throwDatabaseError(error);
    }
    if(!record) throw CustomError.notFound("No existe un salón con ese id");
    return record;
  }
  public async deleteClassroom(id:number):Promise<boolean> {
    const result=await pool.query("DELETE FROM classrooms WHERE id=$1 RETURNING id;",[id]);
    if (result.rowCount === 0) throw CustomError.notFound("No existe un salón con ese id");
    return true;
  }
}
