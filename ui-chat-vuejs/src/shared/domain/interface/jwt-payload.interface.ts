export default interface JWTPayload {
  firstName: string;
  lastName: string;
  email: string;
  iat: number;
  exp: number;
}
