import { useRecoilValue } from "recoil";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import useModal from "../../hooks/useModal";
import { datesState } from "../../store/datesState";
import { tasksState } from "../../store/tasksState";
import { getDateString, getDayInfo } from "../../utils/utils";
import { MODAL_TYPES } from "../Modal/GlobalModal";
import Icon from "../common/Icon/Icon";
import Task from "../Task/Task";
import TaskCreator from "../Task/TaskCreator";

interface IDayProps {
  date: string;
  index: number;
  isToday?: boolean;
}

function Day({ date, index, isToday }: IDayProps) {
  const { day, color } = getDayInfo(index);

  const allDates = useRecoilValue(datesState);
  const allTasks = useRecoilValue(tasksState);

  const currentDate = allDates[date];
  const currentDateTasks = currentDate?.taskIds?.map(
    (taskId) => allTasks[taskId]
  );

  const { openModal, closeModal } = useModal();
  const openAddTaskModal = () =>
    openModal({
      modalType: MODAL_TYPES.ADD_TASK,
      modalProps: {
        date,
        day,
        color,
        closeModal,
      },
    });

  return (
    <Wrapper>
      <Header color={color}>
        <Title color={color}>
          <strong>{isToday ? `✨${day}✨(Today)` : day}</strong>
          {date !== "9999-99-99" && <span>{getDateString(date)}</span>}
        </Title>
        <Icon
          icon="fa fa-plus"
          color={color}
          size="sm"
          mr="5px"
          onClick={openAddTaskModal}
        />
      </Header>
      <Droppable droppableId={date}>
        {(provided) => {
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
              <TaskCreator date={date} color={color} />
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
`;
