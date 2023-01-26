import { container } from "tsyringe";

import { UsersRepository } from "../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "../../modules/accounts/repositories/IUsersTokensRepository";
import { CyclesRepository } from "../../modules/cycles/infra/typeorm/repositories/CyclesRepository";
import { ICyclesRepository } from "../../modules/cycles/repositories/ICyclesRepository";
import { TasksRepository } from "../../modules/tasks/infra/typeorm/repositories/TasksRepository";
import { ITasksRepository } from "../../modules/tasks/repositories/ITasksRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<ITasksRepository>(
  "TasksRepository",
  TasksRepository
);

container.registerSingleton<IUsersTokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository
);

container.registerSingleton<ICyclesRepository>(
  "CyclesRepository",
  CyclesRepository
);
