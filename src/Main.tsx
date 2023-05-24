import React, { useState, useRef } from "react";
import styled from "styled-components";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import { datesAtom } from "./recoil";
import Icon from "./Components/Icon";
import Day from "./Components/Day";
import { getMonday, getDatesOfWeek, getPeriodString } from "./Utils/utils";

function Main() {
  const [currentDay, setCurrentDay] = useState(new Date());
  const [monday, setMonday] = useState(getMonday(currentDay)!);

  const datesOfWeek = getDatesOfWeek(monday);
  const periodString = getPeriodString(datesOfWeek);

  const onPrevWeekClick = () => {
    setMonday((currentMonday) => {
      const dateCopy = new Date(currentMonday);
      dateCopy.setDate(dateCopy.getDate() - 7);
      return dateCopy;
    });
  };

  const onNextWeekClick = () => {
    setMonday((currentMonday) => {
      const dateCopy = new Date(currentMonday);
      dateCopy.setDate(dateCopy.getDate() + 7);
      return dateCopy;
    });
  };

  const calendarRef = useRef<HTMLInputElement>(null);

  const onCalendarClick = () => {
    calendarRef?.current?.showPicker();
  };

  const onCalendarDatePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setCurrentDay(new Date(e.target.value));
      setMonday(getMonday(new Date(e.target.value))!);
    }

    if (!e.target.value) {
      setCurrentDay(new Date());
      setMonday(getMonday(new Date())!);
    }
  };

  const resetDate = () => {
    setCurrentDay(new Date());
    setMonday(getMonday(new Date())!);
  };

  const setDates = useSetRecoilState(datesAtom);

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      // 같은 날짜 내에서 드래그앤드롭
      setDates((allDates) => {
        const currentDate = allDates[source.droppableId];
        const taskIds = [...currentDate.taskIds];
        const currentTask = taskIds[source.index];

        taskIds.splice(source.index, 1);
        taskIds.splice(destination?.index, 0, currentTask);

        return {
          ...allDates,
          [source.droppableId]: {
            ...currentDate,
            taskIds,
          },
        };
      });
    }

    if (source.droppableId !== destination.droppableId) {
      // 다른 날짜 간 드래그앤드롭
      setDates((allDates) => {
        const currentDate = allDates[source.droppableId];

        let destinationDate = allDates[destination.droppableId];
        if (!destinationDate) {
          destinationDate = {
            id: destination.droppableId,
            taskIds: [],
          };
        }

        const currentTaskIds = [...currentDate.taskIds];
        const currentTask = currentTaskIds[source.index];
        currentTaskIds.splice(source.index, 1);

        const destinationTaskIds = [...destinationDate.taskIds];
        destinationTaskIds.splice(destination?.index, 0, currentTask);

        return {
          ...allDates,
          [source.droppableId]: {
            ...currentDate,
            taskIds: currentTaskIds,
          },
          [destination.droppableId]: {
            ...destinationDate,
            taskIds: destinationTaskIds,
          },
        };
      });
    }
  };

  return (
    <Wrapper>
      <Header>
        <Title onClick={resetDate} title="현재 날짜로 이동합니다.">
          Weekly Planner
        </Title>
        <Toolbar>
          <WeekDate>{periodString}</WeekDate>
          <WeekIcons>
            <Icons>
              <Icon
                icon="fa fa-chevron-left"
                size="lg"
                isHover
                onClick={onPrevWeekClick}
              />
              <Icon
                icon="fa fa-calendar-check"
                size="lg"
                isHover
                onClick={onCalendarClick}
              />
              <Icon
                icon="fa fa-chevron-right"
                size="lg"
                isHover
                onClick={onNextWeekClick}
              />
            </Icons>
            <Calendar>
              <input
                type="date"
                id="calendar"
                ref={calendarRef}
                onChange={onCalendarDatePick}
              />
            </Calendar>
          </WeekIcons>
        </Toolbar>
      </Header>
      <DragDropContext onDragEnd={onDragEnd}>
        <Planner>
          {datesOfWeek.map((date, index) => (
            <Day
              key={date}
              date={date}
              index={index}
              isCurrentDay={currentDay.toISOString().split("T")[0] === date}
            />
          ))}
        </Planner>
      </DragDropContext>
    </Wrapper>
  );
}

export default Main;

const Wrapper = styled.div`
  padding: 40px 30px;

  @media (max-width: 640px) {
    padding: 0;
  }
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  background-color: ${(props) => props.theme.bgColor};

  @media (max-width: 640px) {
    position: sticky;
    top: 0;
    z-index: 999;
    margin-bottom: 30px;
    padding: 15px 15px 15px 20px;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  }

  @media (max-width: 320px) {
    padding: 15px 5px 15px 15px;
  }
`;

const Title = styled.h1`
  font-family: "Montserrat Alternates", sans-serif;
  font-size: 16px;
  font-style: italic;
  margin-bottom: 5px;
  user-select: none;
  cursor: pointer;

  @media (max-width: 640px) {
    font-size: 12px;
  }
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
`;

const WeekDate = styled.h2`
  font-family: "Montserrat Alternates", sans-serif;
  font-size: 48px;
  font-weight: 800;
  line-height: 48px;

  &::selection {
    background-color: ${(props) => props.theme.textColor};
    color: white;
  }

  @media (max-width: 640px) {
    font-size: 24px;
    line-height: 24px;
  }

  @media (max-width: 320px) {
    font-size: 20px;
    line-height: 20px;
  }
`;

const WeekIcons = styled.div`
  display: flex;
  flex-direction: column;
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  column-gap: 40px;

  @media (max-width: 640px) {
    column-gap: 20px;
  }
`;

const Calendar = styled.div`
  visibility: hidden;
  height: 0;
  input {
    width: 100%;
    height: 0;
    border: 0;
    padding: 0;
  }
`;

const Planner = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 1280px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: repeat(1, 1fr);
    padding: 0 10px;
  }
`;
