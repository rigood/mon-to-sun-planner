import styled, { css } from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import { tasksAtom, datesAtom } from "../recoil";

interface ITaskProps {
  task: {
    id: string;
    isDone: boolean;
    content: string;
    color: string;
  };
  index: number;
  date: string;
}

function Task({ task, index, date }: ITaskProps) {
  const { id, isDone, content, color } = task;

  const setTasks = useSetRecoilState(tasksAtom);
  const setDates = useSetRecoilState(datesAtom);

  const onIsDoneClick = () => {
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

  const onContentClick = () => {
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
          >
            <IsDone onClick={onIsDoneClick}>
              <i
                className={isDone ? "fa fa-square-check" : "far fa-square"}
              ></i>
            </IsDone>
            <Content onClick={onContentClick}>{content}</Content>
          </Wrapper>
        );
      }}
    </Draggable>
  );
}

export default Task;

const IsDone = styled.div`
  cursor: pointer;
  i {
    font-size: 1.3rem;
  }
`;

const Content = styled.div`
  cursor: pointer;
`;

const Wrapper = styled.div<{ isDone: boolean }>`
  display: flex;
  align-items: start;
  column-gap: 10px;
  padding: 12px 8px;
  background-color: white;
  border-bottom: 1px solid ${(props) => props.theme.lineColor};
  font-size: 1.6rem;

  ${(props) =>
    props.isDone &&
    css`
      opacity: 0.2;

      ${Content} {
        text-decoration: line-through;
      }
    `};
`;
