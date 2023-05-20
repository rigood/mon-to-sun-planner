import { atom } from "recoil";

export interface ITaskAtom {
  [key: string]: {
    id: string;
    isDone: boolean;
    content: string;
    color: string;
  };
}

export const tasksAtom = atom<ITaskAtom>({
  key: "tasks",
  default: {
    "task-1": {
      id: "task-1",
      isDone: true,
      content:
        "공부하기싫어 그치만 해야돼 흑흑흑 보고싶다내사랑 진욱 빠빠빠빠빠빠빠빰 고양콘서트 가고파",
      color: "pink",
    },
    "task-2": {
      id: "task-2",
      isDone: false,
      content: "운동하기",
      color: "gold",
    },
    "task-3": {
      id: "task-3",
      isDone: false,
      content: "알바하기",
      color: "wheat",
    },
    "task-4": {
      id: "task-4",
      isDone: false,
      content: "알바하기",
      color: "wheat",
    },
  },
});

export interface IDateAtom {
  [key: string]: {
    id: string;
    taskIds: string[];
  };
}

export const datesAtom = atom<IDateAtom>({
  key: "days",
  default: {
    "2023-05-18": {
      id: "2023-05-18",
      taskIds: ["task-1", "task-2", "task-4"],
    },
    "2023-05-20": {
      id: "2023-05-20",
      taskIds: ["task-3"],
    },
  },
});
