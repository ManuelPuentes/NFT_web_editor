import { Request } from 'express';

enum HttpMethods {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}
export const getRequestData = (req: Request) => {
  const data: Record<string, any> =
    req.method == (HttpMethods.GET || HttpMethods.DELETE)
      ? req.query
      : req.body;
  return data;
};
