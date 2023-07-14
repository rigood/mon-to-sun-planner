import { atom } from "recoil";
import { MODAL_TYPES } from "../components/Modal/GlobalModal";

export type TAddTaskModal = {
  modalType: typeof MODAL_TYPES.ADD_TASK;
  modalProps: any;
};

export type TEditTaskModal = {
  modalType: typeof MODAL_TYPES.EDIT_TASK;
  modalProps: any;
};

export type ModalType = TAddTaskModal | TEditTaskModal;

export const modalState = atom<ModalType | null>({
  key: "modal",
  default: null,
});
