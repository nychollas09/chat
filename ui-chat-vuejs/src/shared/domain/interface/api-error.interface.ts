export default interface ApiError {
  error: string;
  message: string;
  path: string;
  statusCode: number;
  timestamp: string;
}
