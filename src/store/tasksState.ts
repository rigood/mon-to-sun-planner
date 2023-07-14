import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "mon-to-sun-planner",
});

export interface ITaskState {
  [key: string]: {
    id: string;
    isDone: boolean;
    title: string;
    memo?: string;
  };
}

export const tasksState = atom<ITaskState>({
  key: "tasks",
  default: {
    "task-1": {
      id: "task-1",
      isDone: true,
      title: "프로젝트 리팩토링",
    },
    "task-2": {
      id: "task-2",
      isDone: false,
      title: "헬스장 다녀오기",
    },
    "task-3": {
      id: "task-3",
      isDone: false,
      title: "모던JS 딥다이브 정리",
    },
    "task-4": {
      id: "task-4",
      isDone: true,
      title: "콘서트 티켓팅",
    },
  },
  effects_UNSTABLE: [persistAtom],
});
