import { Task } from "../../../infra/typeorm/entities/Task";

interface IMapperResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
  id?: string;
  title: string;
  done: boolean;
  created_at: Date;
  updated_at: Date;
  user_id: string;
}

export const allTasksMapper = (tasks: Task[]): IMapperResponse[] => {
  const mappedTasks = tasks.map((task) => {
    const { user, ...taskInfo } = task;

    return {
      ...taskInfo,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  });

  return mappedTasks;
};
