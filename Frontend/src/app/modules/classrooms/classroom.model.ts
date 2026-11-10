  export interface Classroom {
    id: number;
    name: string;
building: string;
capacity: number;
status: boolean;
  }
  export type ClassroomPayload = Omit<Classroom, 'id'>;
