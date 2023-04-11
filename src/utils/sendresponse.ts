import { IResponse } from 'src/modules/shared/interfaces/response.interface';

export default function sendResponse<T>({
  status,
  data,
  message,
}): IResponse<T> {
  return {
    status: status,
    data: data || [],
    message: message || 'Success',
  };
}
