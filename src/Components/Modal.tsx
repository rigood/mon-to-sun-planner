import React from "react";
import ReactDom from "react-dom";
import styled, { keyframes } from "styled-components";
import AddModal from "./AddModal";
import EditModal from "./EditModal";

interface IModalProps {
  kind: string;
  closeModal: () => void;
}

interface IModals {
  [key: string]: React.ReactElement;
}

const MODALS: IModals = {
  add: <AddModal />,
  edit: <EditModal />,
};

function Modal({ kind, closeModal }: IModalProps) {
  if (!kind) return null;

  return ReactDom.createPortal(
    <>
      <Overlay onClick={closeModal}></Overlay>
      <Content>{MODALS[kind]}</Content>
    </>,
    document.getElementById("portal")!
  );
}

export default Modal;

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
