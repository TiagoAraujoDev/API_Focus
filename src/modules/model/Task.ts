import { v4 as uuidv4 } from "uuid";

class Task {
  id?: string;
  title: string;
  done: boolean;
  created_at: Date;
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
