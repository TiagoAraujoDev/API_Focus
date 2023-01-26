import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

import { User } from "../../../../accounts/infra/typeorm/entities/User";

@Entity("cycles")
class Cycle {
  @PrimaryColumn()
  id?: string;

  @Column({ type: "varchar" })
  task: string;

  @Column({ type: "int" })
  minutesAmount: number;

  @Column({ type: "timestamp" })
  startDate: Date;

  @Column({ type: "timestamp", nullable: true })
  interruptedDate?: Date;

  @Column({ type: "timestamp", nullable: true })
  finishedDate?: Date;

  @ManyToOne(() => User, (user) => user.cycles)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  user_id: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Cycle };
