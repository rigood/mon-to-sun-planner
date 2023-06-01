import styled, { css } from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import { useRecoilValue } from "recoil";
import { datesState } from "../store/datesState";
import { tasksState } from "../store/tasksState";
import useModal from "../hooks/useModal";
import { MODAL_TYPES } from "../GlobalModal";
import { getDateString } from "../utils/utils";
import Icon from "./Icon";
import Task from "./Task";

function getDayInfo(index: number) {
  switch (index) {
    case 0:
      return { day: "월요일", color: "#E61A73" };
    case 1:
      return { day: "화요일", color: "#EDAE13" };
    case 2:
      return { day: "수요일", color: "#0BBAB3" };
    case 3:
      return { day: "목요일", color: "#0764A1" };
    case 4:
      return { day: "금요일", color: "#25A2DA" };
    case 5:
      return { day: "토요일", color: "#8146C4" };
    case 6:
      return { day: "일요일", color: "#E97EC2" };
    default:
      return { day: "", color: "#000000" };
  }
}

interface IDayProps {
  date: string;
  index: number;
  isCurrentDay: boolean;
}

function Day({ date, index, isCurrentDay }: IDayProps) {
  const { day, color } = getDayInfo(index);

  const allDates = useRecoilValue(datesState);
  const allTasks = useRecoilValue(tasksState);

  const currentDate = allDates[date];
  const currentDateTasks = currentDate?.taskIds?.map(
    (taskId) => allTasks[taskId]
  );

  const { openModal, closeModal } = useModal();

  const openAddTaskModal = (isDraggingOver: boolean) => {
    if (isDraggingOver) return;

    openModal({
      modalType: MODAL_TYPES.ADD_TASK,
      modalProps: {
        date,
        day,
        color,
        closeModal,
      },
    });
  };

  return (
    <Wrapper>
      <Header color={color}>
        <Title color={color}>
          <strong>{isCurrentDay ? `✨ ${day} ✨` : day}</strong>
          <span>{getDateString(date)}</span>
        </Title>
        <Icon
          icon="fa fa-plus"
          color={color}
          size="sm"
          mr="5px"
          onClick={() => openAddTaskModal(false)}
        />
      </Header>
      <Droppable droppableId={date}>
        {(provided, snapshot) => {
          return (
            <TaskList ref={provided.innerRef} {...provided.droppableProps}>
              {currentDateTasks?.map((task, index) => (
                <Task
                  key={task.id}
                  task={task}
                  index={index}
                  date={date}
                  day={day}
                  color={color}
                />
              ))}
              {provided.placeholder}
              <BlankArea
                color={color}
                onClick={() => openAddTaskModal(snapshot.isDraggingOver)}
              ></BlankArea>
            </TaskList>
          );
        }}
      </Droppable>
    </Wrapper>
  );
}

export default Day;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 8px;
  padding-bottom: 30px;
`;

const Header = styled.div<{ color: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 10px;
  padding-bottom: 5px;
  border-bottom: ${(props) => `5px solid ${props.color}`};
`;

const Title = styled.div<{ color: string }>`
  strong {
    font-size: 18px;
    font-weight: bold;
    color: ${(props) => props.color};
    margin-right: 5px;

    &::selection {
      background-color: ${(props) => props.color};
      color: white;
    }
  }

  span {
    font-size: 16px;
    color: ${(props) => props.theme.subTextColor};

    &::selection {
      background-color: ${(props) => props.color};
      color: white;
    }
  }
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: ${(props) => props.theme.dayBgColor};
  cursor: pointer;
`;

const BlankArea = styled.div<{
  color: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  background-color: ${(props) => props.theme.dayBgColor};
`;
