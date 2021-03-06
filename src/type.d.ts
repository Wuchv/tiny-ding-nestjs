interface IResponse<T> {
  statusCode: number;
  message: string;
  payload?: T;
}

type ServiceReturn<T> = Promise<[string, T]>;
