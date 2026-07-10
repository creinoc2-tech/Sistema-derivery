export class AppError extends Error {
  public readonly code: string;
  public readonly status: number;

  constructor(code: string, status: number = 400, message?: string) {
    super(message ?? code);
    this.code = code;
    this.status = status;
    this.name = "AppError";
  }
}