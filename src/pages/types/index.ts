import { Session } from 'next-auth';

interface CustomSession extends Session {
  user: {
    id: string;
    email: string;
  };
}
