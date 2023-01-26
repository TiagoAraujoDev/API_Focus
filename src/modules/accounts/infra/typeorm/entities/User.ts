import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

import { Cycle } from "../../../../cycles/infra/typeorm/entities/Cycle";
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

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @OneToMany(() => Cycle, (cycle) => cycle.user)
  cycles: Cycle[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { User };
