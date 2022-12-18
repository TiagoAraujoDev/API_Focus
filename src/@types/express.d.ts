import { User } from "../modules/accounts/infra/typeorm/entities/User";

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    export interface Request {
      user: Partial<User>;
    }
  }
}
