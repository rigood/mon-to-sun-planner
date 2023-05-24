import React from "react";
import styled, { css } from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import { tasksAtom, datesAtom } from "../recoil";

interface ITaskProps {
  task: {
    id: string;
    isDone: boolean;
    content: string;
  };
  index: number;
  date: string;
  color: string;
}

function Task({ task, index, date, color }: ITaskProps) {
  const { id, isDone, content } = task;

  const setTasks = useSetRecoilState(tasksAtom);
  const setDates = useSetRecoilState(datesAtom);

  const toggleIsDone = () => {
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

  const editTask = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const input = prompt("수정", content);

    if (input === "" || input === null) return;

    setTasks((allTasks) => {
      const currentTask = allTasks[id];

      return {
        ...allTasks,
        [id]: {
          ...currentTask,
          content: input,
        },
      };
    });
  };

  const deleteTask = () => {
    setTasks((allTasks) => {
      const allTasksArray = Object.entries(allTasks);
      const newTasksArray = allTasksArray.filter((task) => task[0] !== id);
      const newTasks = Object.fromEntries(newTasksArray);

      return newTasks;
    });

    setDates((allDates) => {
      const currentDate = allDates[date];
      const taskIds = [...currentDate.taskIds];
      taskIds.splice(index, 1);

      return {
        ...allDates,
        [date]: {
          ...currentDate,
          taskIds,
        },
      };
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
            <EditBtn onClick={editTask}>
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
`;

const EditBtn = styled.div`
  margin-left: 5px;
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
  padding: 12px 8px;
  background-color: white;
  border-bottom: 1px solid ${(props) => props.theme.lineColor};
  font-size: 16px;

  ${(props) =>
    props.isDone &&
    css`
      opacity: 0.2;

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
