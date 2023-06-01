import { useEffect } from "react";
import ReactDom from "react-dom";
import styled, { keyframes } from "styled-components";
import { useRecoilState } from "recoil";
import { modalState } from "./store/modalState";
import AddTaskModal from "./components/Modals/AddTaskModal";
import EditTaskModal from "./components/Modals/EditTaskModal";

export const MODAL_TYPES = {
  ADD_TASK: "ADD_TASK",
  EDIT_TASK: "EDIT_TASK",
};

interface IModals {
  [key: string]: any;
}

const ModalComponents: IModals = {
  [MODAL_TYPES.ADD_TASK]: AddTaskModal,
  [MODAL_TYPES.EDIT_TASK]: EditTaskModal,
};

function GlobalModal() {
  const [modal, setModal] = useRecoilState(modalState);
  const { modalType, modalProps } = modal || {};

  useEffect(() => {
    if (!modalType) return;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [modalType]);

  const ModalComponent = ModalComponents[modalType!];

  const renderComponent = () => {
    if (!modalType) {
      return null;
    }

    return ReactDom.createPortal(
      <>
        <Overlay onClick={() => setModal(null)}></Overlay>
        <Content>
          <ModalComponent {...modalProps} />
        </Content>
      </>,
      document.getElementById("portal")!
    );
  };

  return <>{renderComponent()}</>;
}

export default GlobalModal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.8);
  z-index: 9999;
`;

const slideIn = keyframes`
    from {
        opacity: 0;
        transform:  translateY(100%);
    }
    to {
        opacity: 1;
        transform: translateY(0%);
    }
`;

const Content = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 90%;
  max-width: 500px;
  height: 400px;
  background-color: ${(props) => props.theme.modalBgColor};
  z-index: 9999;
  animation: ${slideIn};
  animation-duration: 0.3s;
`;
