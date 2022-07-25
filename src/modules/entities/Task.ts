import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { User } from "./User";

@Entity("tasks")
class Task {
  @PrimaryColumn()
  id?: string;

  @Column()
  title: string;

  @Column()
  done: boolean;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @Column()
  user_id: string;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: "user_id" })
  user: User;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Task };
