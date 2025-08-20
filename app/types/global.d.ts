import type { AxiosError } from "axios";

export {};

declare global {
  type ApiPaginated<T> = {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
  };

  type ApiErrorData = Record<string, (string | ApiErrorData)[]>;

  type ApiError = AxiosError<ApiErrorData>;
}
