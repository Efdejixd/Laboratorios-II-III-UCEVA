export interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  birthdate: string;
  semester: number;
  status: boolean;
}
export type StudentPayload = Omit<Student, "id">;
export type CreateStudentPayload = Student;
