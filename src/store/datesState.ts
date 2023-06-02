import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { getLocalTimeString } from "../utils/utils";

const { persistAtom } = recoilPersist({
  key: "mon-to-sun-planner",
});

export interface IDateState {
  [key: string]: {
    id: string;
    taskIds: string[];
  };
}

const today = getLocalTimeString(new Date());

export const datesState = atom<IDateState>({
  key: "dates",
  default: {
    [today]: {
      id: today,
      taskIds: ["task-1", "task-2", "task-3", "task-4"],
    },
  },
  effects_UNSTABLE: [persistAtom],
});
