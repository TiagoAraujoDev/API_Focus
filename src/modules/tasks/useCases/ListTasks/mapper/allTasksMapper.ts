import { Task } from "../../../infra/typeorm/entities/Task";

export const allTasksMapper = (tasks: Task[]) => {
  const mappedTasks = tasks.map((task) => {
    const { user, ...taskInfo } = task;

    return {
      ...taskInfo,
      user: {
        id: user.id,
        name: user.name,
      },
    };
  });

  return mappedTasks;
};
