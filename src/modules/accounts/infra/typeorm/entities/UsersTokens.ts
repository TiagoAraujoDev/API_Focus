import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

import { User } from "./User";

@Entity("users_tokens")
class UsersTokens {
  @PrimaryColumn()
  id: string;

  @Column({ type: "varchar" })
  refresh_token: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  user_id: string;

  @Column({ type: "timestamp" })
  expires_date: Date;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { UsersTokens };
