import { JwtPayload } from 'jsonwebtoken';

interface UserJwtPayload extends JwtPayload {
  user_uuid: string;
  email?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserJwtPayload;
    }
  }
}