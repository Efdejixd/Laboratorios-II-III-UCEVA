  export interface Professor {
    id: number;
    name: string;
email: string;
department: string;
status: boolean;
  }
  export type ProfessorPayload = Omit<Professor, 'id'>;
