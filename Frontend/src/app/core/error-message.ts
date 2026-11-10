import { HttpErrorResponse } from '@angular/common/http';

export function apiErrorMessage(error: unknown): string {
  if (error instanceof HttpErrorResponse) {
    if (error.status === 0) return 'No se pudo conectar con el backend. Comprueba que npm start esté funcionando en Backend.';
    if (error.status === 404) return 'El registro no existe o fue eliminado.';
    if (error.status === 409) return 'Ya existe un registro con esos datos.';
    const message: unknown = error.error?.error;
    if (typeof message === 'string' && message.trim()) return message;
    return `Error del servidor (${error.status}).`;
  }
  return 'Ocurrió un error inesperado. Intenta nuevamente.';
}
