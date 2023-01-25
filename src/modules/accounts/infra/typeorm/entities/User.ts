import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

import { Task } from "../../../../tasks/infra/typeorm/entities/Task";

@Entity("users")
class User {
  @PrimaryColumn()
  id?: string;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar", unique: true })
  username: string;

  @Column({ type: "varchar", unique: true })
  email: string;

  @Column({ type: "varchar" })
  password: string;

  @Column({ type: "varchar", nullable: true })
  avatar?: string;

  @CreateDateColumn({ type: "varchar" })
  created_at: Date;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { User };
