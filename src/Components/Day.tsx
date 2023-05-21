import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import { useRecoilValue } from "recoil";
import { datesAtom, tasksAtom } from "../recoil";
import { getDateString } from "../Utils/utils";
import Icon from "./Icon";
import Task from "./Task";

interface IDayProps {
  date: string;
  index: number;
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

function Day({ date, index }: IDayProps) {
  const { day, color } = getDayInfo(index);

  const allDates = useRecoilValue(datesAtom);
  const allTasks = useRecoilValue(tasksAtom);

  const currentDate = allDates[date];
  const currentDateTasks = currentDate?.taskIds?.map(
    (taskId) => allTasks[taskId]
  );

  return (
    <Wrapper>
      <Header color={color}>
        <Title color={color}>
          <strong>{day}</strong>
          <span>{getDateString(date)}</span>
        </Title>
        <Icon icon="fa fa-plus" color={color} mr="5px" />
      </Header>
      <Droppable droppableId={date}>
        {(provided, snapshot) => {
          return (
            <TaskList ref={provided.innerRef} {...provided.droppableProps}>
              {currentDateTasks?.map((task, index) => (
                <Task key={task.id} task={task} index={index} date={date} />
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
  &:not(:last-child) {
    margin-right: 16px;
  }
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
    font-size: 1.8rem;
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
    font-size: 1.2rem;
    color: ${(props) => props.theme.subTextColor};
    user-select: none;
  }
`;

const TaskList = styled.div`
  min-height: 400px;
  background-color: ${(props) => props.theme.lineColor};
  border-top: none;
`;
