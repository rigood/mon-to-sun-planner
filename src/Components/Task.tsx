import React from "react";
import styled, { css } from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import { tasksState } from "../store/tasksState";
import useModal from "../hooks/useModal";
import { MODAL_TYPES } from "../GlobalModal";

interface ITaskProps {
  task: {
    id: string;
    isDone: boolean;
    content: string;
  };
  index: number;
  date: string;
  day: string;
  color: string;
}

function Task({ task, index, date, day, color }: ITaskProps) {
  const { id, isDone, content } = task;

  const setTasks = useSetRecoilState(tasksState);

  const toggleIsDone = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    setTasks((allTasks) => {
      const currentTask = allTasks[id];

      return {
        ...allTasks,
        [id]: {
          ...currentTask,
          isDone: !currentTask.isDone,
        },
      };
    });
  };

  const { openModal, closeModal } = useModal();

  const openEditTaskModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    openModal({
      modalType: MODAL_TYPES.EDIT_TASK,
      modalProps: {
        id,
        date,
        day,
        color,
        index,
        content,
        closeModal,
      },
    });
  };

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
            onClick={toggleIsDone}
          >
            <IsDoneCheckBox>
              <i
                className={isDone ? "fa fa-square-check" : "far fa-square"}
              ></i>
            </IsDoneCheckBox>
            <Content>{content}</Content>
            <EditBtn onClick={openEditTaskModal}>
              <i className="fa fa-pencil" />
            </EditBtn>
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

const Content = styled.div`
  flex-grow: 1;
  font-size: 14px;
  cursor: pointer;
  word-break: break-all;
  word-wrap: break-word;
  white-space: pre;
`;

const EditBtn = styled.div`
  margin-left: 5px;
  padding: 0 5px;
  cursor: pointer;

  i {
    font-size: 14px;
  }

  @media (hover: hover) and (pointer: fine) {
    visibility: hidden;
  }
`;

const Wrapper = styled.div<{ isDone: boolean; color: string }>`
  display: flex;
  align-items: start;
  padding: 12px 10px;
  background-color: white;
  border-bottom: 1px solid ${(props) => props.theme.lineColor};
  font-size: 16px;

  ${(props) =>
    props.isDone &&
    css`
      color: rgba(0, 0, 0, 0.2);

      ${Content} {
        text-decoration: line-through;
      }
    `};

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      border-bottom-color: ${(props) => props.color};

      ${EditBtn} {
        visibility: visible;
        cursor: pointer;
      }
    }
  }
`;
