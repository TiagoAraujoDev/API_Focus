import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("tasks")
class Task {
  @PrimaryColumn()
  id?: string;

  @Column()
  title: string;

  @Column()
  done: boolean;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  constructor(title: string) {
    if (!this.id) {
      this.id = uuidv4();
    }
    this.title = title;
    this.done = false;
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}

export { Task };
