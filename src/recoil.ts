import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { getLocalTimeString } from "./Utils/utils";

const { persistAtom } = recoilPersist({
  key: "weekly-planner",
});

export interface ITaskAtom {
  [key: string]: {
    id: string;
    isDone: boolean;
    content: string;
  };
}

export const tasksAtom = atom<ITaskAtom>({
  key: "tasks",
  default: {
    "task-1": {
      id: "task-1",
      isDone: true,
      content: "프로젝트 리팩토링",
    },
    "task-2": {
      id: "task-2",
      isDone: false,
      content: "헬스장 다녀오기",
    },
    "task-3": {
      id: "task-3",
      isDone: false,
      content: "모던JS 딥다이브 정리 ",
    },
    "task-4": {
      id: "task-4",
      isDone: true,
      content: "콘서트 티켓팅",
    },
  },
  effects_UNSTABLE: [persistAtom],
});

export interface IDateAtom {
  [key: string]: {
    id: string;
    taskIds: string[];
  };
}

const today = getLocalTimeString(new Date());

export const datesAtom = atom<IDateAtom>({
  key: "dates",
  default: {
    [today]: {
      id: today,
      taskIds: ["task-1", "task-2", "task-3", "task-4"],
    },
  },
  effects_UNSTABLE: [persistAtom],
});

export const modalAtom = atom<boolean | string>({
  key: "modal",
  default: false,
});
