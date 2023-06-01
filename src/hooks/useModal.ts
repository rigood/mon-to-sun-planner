import { useSetRecoilState } from "recoil";
import { modalState, ModalType } from "../store/modalState";

function useModal() {
  const setModal = useSetRecoilState(modalState);

  const openModal = ({ modalType, modalProps }: ModalType) => {
    setModal({ modalType, modalProps });
  };

  const closeModal = () => {
    setModal(null);
  };

  return { openModal, closeModal };
}

export default useModal;
