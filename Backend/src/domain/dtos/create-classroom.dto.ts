export class CreateClassroomDTO {
  private constructor(
    public readonly name: string,
    public readonly building: string,
    public readonly capacity: number,
    public readonly status: boolean
  ) {}
  static create(object: { [key:string]:any }): [string | undefined, CreateClassroomDTO?] {
    if (!object || typeof object !== "object" || Array.isArray(object)) return ["Body must be a JSON object"];
    const { name, building, capacity, status } = object;
    if (typeof name !== "string" || !name.trim()) return ["Invalid name"];
    if (name.length > 100) return ["name: max 100 characters"];
    if (typeof building !== "string" || !building.trim()) return ["Invalid building"];
    if (building.length > 100) return ["building: max 100 characters"];
    if (!Number.isInteger(capacity) || capacity < 1 || capacity > 300) return ["Invalid capacity"];
    if (typeof status !== "boolean") return ["Invalid status"];
    return [undefined, new CreateClassroomDTO(name, building, capacity, status)];
  }
}
