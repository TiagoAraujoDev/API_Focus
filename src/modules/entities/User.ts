import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { Task } from "./Task";

@Entity("users")
class User {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  avatar?: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { User };
