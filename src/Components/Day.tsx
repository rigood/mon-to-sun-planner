import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { datesAtom, tasksAtom } from "../recoil";
import { getDateString } from "../Utils/utils";
import Icon from "./Icon";
import Task from "./Task";

interface IDayProps {
  date: string;
  index: number;
  isCurrentDay: boolean;
}

function getDayInfo(index: number) {
  switch (index) {
    case 0:
      return { day: "MON", color: "#E61A73" };
    case 1:
      return { day: "TUE", color: "#EDAE13" };
    case 2:
      return { day: "WED", color: "#0BBAB3" };
    case 3:
      return { day: "THU", color: "#0764A1" };
    case 4:
      return { day: "FRI", color: "#25A2DA" };
    case 5:
      return { day: "SAT", color: "#8146C4" };
    case 6:
      return { day: "SUN", color: "#E97EC2" };
    default:
      return { day: "", color: "#000000" };
  }
}

function Day({ date, index, isCurrentDay }: IDayProps) {
  const { day, color } = getDayInfo(index);

  const [allDates, setDates] = useRecoilState(datesAtom);
  const [allTasks, setTasks] = useRecoilState(tasksAtom);

  const currentDate = allDates[date];
  const currentDateTasks = currentDate?.taskIds?.map(
    (taskId) => allTasks[taskId]
  );

  const onAddTaskClick = () => {
    const input = prompt("추가");

    if (input === "" || input === null) return;

    const newTaskId = String(Date.now());

    const newTask = {
      id: newTaskId,
      isDone: false,
      content: input,
    };

    setTasks((allTasks) => {
      return {
        ...allTasks,
        [newTaskId]: newTask,
      };
    });

    setDates((allDates) => {
      let currentDate = allDates[date];
      if (!currentDate) {
        currentDate = {
          id: date,
          taskIds: [],
        };
      }

      const taskIds = [...currentDate.taskIds];
      taskIds.push(newTaskId);

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
    <Wrapper>
      <Header color={color}>
        <Title color={color}>
          <strong>{day}</strong>
          <span>{getDateString(date)}</span>
        </Title>
        <Icon
          icon="fa fa-plus"
          color={color}
          mr="5px"
          onClick={onAddTaskClick}
        />
      </Header>
      <Droppable droppableId={date}>
        {(provided, snapshot) => {
          return (
            <TaskList
              ref={provided.innerRef}
              {...provided.droppableProps}
              color={color}
              isCurrentDay={isCurrentDay}
            >
              {currentDateTasks?.map((task, index) => (
                <Task
                  key={task.id}
                  task={task}
                  index={index}
                  date={date}
                  color={color}
                />
              ))}
              {provided.placeholder}
            </TaskList>
          );
        }}
      </Droppable>
    </Wrapper>
  );
}

export default Day;

const Wrapper = styled.div`
  padding: 0px 8px;
  padding-bottom: 30px;
`;

const Header = styled.div<{ color: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 10px;
  padding-bottom: 5px;
  border-bottom: 2px solid ${(props) => props.color};
`;

const Title = styled.div<{ color: string }>`
  strong {
    font-family: "Montserrat Alternates", sans-serif;
    font-size: 18px;
    font-weight: bold;
    font-style: italic;
    color: ${(props) => props.color};
    margin-right: 10px;

    &::selection {
      background-color: ${(props) => props.color};
      color: white;
    }
  }

  span {
    font-family: "Montserrat Alternates", sans-serif;
    font-size: 12px;
    color: ${(props) => props.theme.subTextColor};
    user-select: none;
  }
`;

const TaskList = styled.div<{ color: string; isCurrentDay: boolean }>`
  min-height: 300px;
  background-color: ${(props) => props.theme.lineColor};
  outline: ${(props) =>
    props.isCurrentDay ? `2px solid ${props.color}` : "none"};
`;
