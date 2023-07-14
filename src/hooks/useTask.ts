import { useSetRecoilState } from "recoil";
import { tasksState } from "../store/tasksState";
import { datesState } from "../store/datesState";

function useTask() {
  const setTasks = useSetRecoilState(tasksState);
  const setDates = useSetRecoilState(datesState);

  const addTask = (date: string, title: string, memo?: string) => {
    if (title === "") return;

    const newTaskId = String(Date.now());

    const newTask = {
      id: newTaskId,
      isDone: false,
      title,
      memo,
    };

    setTasks((allTasks) => {
      return {
        ...allTasks,
        [newTaskId]: newTask,
      };
    });

    setDates((allDates) => {
      let currentDate = allDates[date];
      if (!currentDate) {
        currentDate = {
          id: date,
          taskIds: [],
        };
      }

      const taskIds = [...currentDate.taskIds];
      taskIds.push(newTaskId);

      return {
        ...allDates,
        [date]: {
          ...currentDate,
          taskIds,
        },
      };
    });
  };

  const editTask = (
    id: string,
    title: string,
    memo: string,
    initialDate: string,
    newDate: string
  ) => {
    if (title === "") {
      alert("Task 제목을 입력해주세요");
      return;
    }

    setTasks((allTasks) => {
      const currentTask = allTasks[id];

      return {
        ...allTasks,
        [id]: {
          ...currentTask,
          title,
          memo,
        },
      };
    });

    if (initialDate !== newDate) {
      setDates((allDates) => {
        const initialDateObj = allDates[initialDate];

        let newDateObj = allDates[newDate];
        if (!newDateObj) {
          newDateObj = {
            id: newDate,
            taskIds: [],
          };
        }

        const initialTaskIds = [...initialDateObj.taskIds];
        const index = initialTaskIds.findIndex((taskId) => taskId === id);
        const initialTask = initialTaskIds.splice(index, 1);

        const newTaskIds = [...newDateObj.taskIds];
        newTaskIds.push(initialTask[0]);

        return {
          ...allDates,
          [initialDate]: {
            ...initialDateObj,
            taskIds: initialTaskIds,
          },
          [newDate]: {
            ...newDateObj,
            taskIds: newTaskIds,
          },
        };
      });
    }
  };

  const deleteTask = (date: string, taskId: string, index: number) => {
    const ok = window.confirm("정말 삭제하시겠습니까?");

    if (ok) {
      setTasks((allTasks) => {
        const allTasksArray = Object.entries(allTasks);
        const newTasksArray = allTasksArray.filter(
          (task) => task[0] !== taskId
        );
        const newTasks = Object.fromEntries(newTasksArray);

        return newTasks;
      });

      setDates((allDates) => {
        const currentDate = allDates[date];
        const taskIds = [...currentDate.taskIds];
        taskIds.splice(index, 1);

        return {
          ...allDates,
          [date]: {
            ...currentDate,
            taskIds,
          },
        };
      });
    } else {
      return;
    }
  };

  const toggleIsDone = (taskId: string) => {
    setTasks((allTasks) => {
      const currentTask = allTasks[taskId];

      return {
        ...allTasks,
        [taskId]: {
          ...currentTask,
          isDone: !currentTask.isDone,
        },
      };
    });
  };

  return { addTask, editTask, deleteTask, toggleIsDone };
}

export default useTask;
