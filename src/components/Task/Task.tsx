import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled, { css } from "styled-components";
import useTask from "../../hooks/useTask";
import useModal from "../../hooks/useModal";
import { MODAL_TYPES } from "../Modal/GlobalModal";
import MiniButton from "../common/Button/MiniButton";

interface ITaskProps {
  task: {
    id: string;
    isDone: boolean;
    title: string;
    memo?: string;
  };
  index: number;
  date: string;
  day: string;
  color: string;
}

function Task({ task, index, date, day, color }: ITaskProps) {
  const { id, isDone, title, memo } = task;

  const { openModal, closeModal } = useModal();
  const openEditTaskModal = () =>
    openModal({
      modalType: MODAL_TYPES.EDIT_TASK,
      modalProps: {
        id,
        date,
        day,
        color,
        index,
        title,
        memo,
        closeModal,
      },
    });

  const { toggleIsDone, deleteTask } = useTask();
  const handleToggleIsDone = () => toggleIsDone(id);
  const handleDeleteTask = () => deleteTask(date, id, index);

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => {
        return (
          <Wrapper
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            isDone={isDone}
            color={color}
          >
            <IsDoneCheckBox onClick={handleToggleIsDone}>
              <i
                className={isDone ? "fa fa-square-check" : "far fa-square"}
              ></i>
            </IsDoneCheckBox>
            <Title onClick={openEditTaskModal}>{title}</Title>
            <Buttons>
              <MiniButton onClick={openEditTaskModal} icon="fa fa-pencil" />
              <MiniButton onClick={handleDeleteTask} icon="fa fa-trash" />
            </Buttons>
          </Wrapper>
        );
      }}
    </Draggable>
  );
}

export default React.memo(Task);

const IsDoneCheckBox = styled.div`
  margin-right: 10px;
  cursor: pointer;

  i {
    font-size: 14px;
  }
`;

const Title = styled.div`
  flex-grow: 1;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: nowrap;
  cursor: pointer;
`;

const Buttons = styled.div`
  display: flex;

  @media (hover: hover) and (pointer: fine) {
    visibility: hidden;
  }
`;

const Wrapper = styled.div<{ isDone: boolean; color: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 10px;
  background-color: white;
  border-bottom: 1px solid ${(props) => props.theme.lineColor};
  font-size: 16px;

  ${(props) =>
    props.isDone &&
    css`
      color: ${props.theme.isDoneColor};

      ${Title} {
        text-decoration: line-through;
      }
    `};

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      border-bottom-color: ${(props) => props.color};

      ${Buttons} {
        visibility: visible;
        cursor: pointer;
      }
    }
  }
`;
