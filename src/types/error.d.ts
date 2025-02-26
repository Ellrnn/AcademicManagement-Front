export interface ErrorResponse {
  response: {
    data: {
      errors: string[];
    };
  };
}
