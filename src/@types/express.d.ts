import { User } from "../modules/accounts/infra/typeorm/entities/User";

declare global {
  namespace Express {
    export interface Request {
      user: Partial<User>;
    }
  }
}
