export class CreateProfessorDTO {
  private constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly department: string,
    public readonly status: boolean
  ) {}
  static create(object: { [key:string]:any }): [string | undefined, CreateProfessorDTO?] {
    if (!object || typeof object !== "object" || Array.isArray(object)) return ["Body must be a JSON object"];
    const { name, email, department, status } = object;
    if (typeof name !== "string" || !name.trim()) return ["Invalid name"];
    if (name.length > 100) return ["name: max 100 characters"];
    if (typeof email !== "string" || !email.trim()) return ["Invalid email"];
    if (email.length > 150) return ["email: max 150 characters"];
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return ["Invalid email"];
    if (typeof department !== "string" || !department.trim()) return ["Invalid department"];
    if (department.length > 100) return ["department: max 100 characters"];
    if (typeof status !== "boolean") return ["Invalid status"];
    return [undefined, new CreateProfessorDTO(name, email, department, status)];
  }
}
