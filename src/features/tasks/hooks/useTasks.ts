import { useEffect, useMemo } from 'react';

import { useTasksStore } from '../store/tasks-store';
import { getActiveTasks, getCompletedTasks } from '../utils';
import { Task } from '../types';

type UseTasksData = {
  tasks: Task[] | undefined;
  isSuccess: boolean;
};

export const useTasks = ({ tasks, isSuccess }: UseTasksData) => {
  const {
    tasksType,
    activeTasksCount,
    completedTasksCount,
    setTasksCounts,
  } = useTasksStore((state) => state);

  const isActiveTasksEmpty = activeTasksCount === 0;
  const isCompletedTasksEmpty = completedTasksCount === 0;

  const activeTasks = useMemo(() => {
    return getActiveTasks(tasks);
  }, [tasks]);

  const completedTasks = useMemo(() => {
    return getCompletedTasks(tasks);
  }, [tasks]);

  // Change tasks count when tasks updated
  useEffect(() => {
    if (isSuccess && tasks) {
      setTasksCounts(tasks);
    }
  }, [isSuccess, tasks]);

  return {
    activeTasks,
    completedTasks,
    tasksType,
    activeTasksCount,
    completedTasksCount,
    isActiveTasksEmpty,
    isCompletedTasksEmpty,
  };
};
