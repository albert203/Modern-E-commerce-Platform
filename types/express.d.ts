// types/express.d.ts
import { SessionData } from 'express-session';

declare module 'express-session' {
  interface SessionData {
    user?: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
    };
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: SessionData['user'];
    }
  }
}
