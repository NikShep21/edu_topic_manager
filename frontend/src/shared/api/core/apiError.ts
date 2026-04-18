export class ApiError<TData> extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: TData,
  ) {
    super(message);
    this.name = "ApiError";
  }
}
