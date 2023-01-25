import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { User } from "../../../../accounts/infra/typeorm/entities/User";

@Entity("tasks")
class Task {
  @PrimaryColumn()
  id?: string;

  @Column({ type: "varchar" })
  title: string;

  @Column({ type: "boolean", default: false })
  done: boolean;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @CreateDateColumn({ type: "timestamp", update: true })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  user_id: string;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Task };
