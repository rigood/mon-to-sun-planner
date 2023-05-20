import React, { useState, useRef } from "react";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import Icon from "./Components/Icon";
import Day from "./Components/Day";
import { getMonday, getDatesOfWeek, getPeriodString } from "./Utils/utils";

function Main() {
  const currentMonday = getMonday(new Date())!;
  const [monday, setMonday] = useState(currentMonday);

  const datesOfWeek = getDatesOfWeek(monday);
  const periodString = getPeriodString(datesOfWeek);

  const onPrevWeekClick = () => {
    setMonday((currentMonday) => {
      const day = currentMonday.getDate();
      const prevMonday = new Date(currentMonday.setDate(day - 7));
      return prevMonday;
    });
  };

  const onNextWeekClick = () => {
    setMonday((currentMonday) => {
      const day = currentMonday.getDate();
      const nextMonday = new Date(currentMonday.setDate(day + 7));
      return nextMonday;
    });
  };

  const calendarRef = useRef<HTMLInputElement>(null);

  const onCalendarClick = () => {
    calendarRef?.current?.showPicker();
  };

  const onPickCalendarDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMonday(getMonday(new Date(e.target.value))!);
  };

  const onDragEnd = () => {};

  return (
    <Wrapper>
      <Header>
        <Title>Weekly Planner</Title>
        <Toolbar>
          <WeekDate>{periodString}</WeekDate>
          <WeekIcons>
            <Icons>
              <Icon
                icon="fa fa-chevron-left"
                size="lg"
                isHover
                alignEnd
                onClick={onPrevWeekClick}
              />
              <Icon
                icon="fa fa-calendar-check"
                size="lg"
                isHover
                alignEnd
                onClick={onCalendarClick}
              />
              <Icon
                icon="fa fa-chevron-right"
                size="lg"
                isHover
                alignEnd
                onClick={onNextWeekClick}
              />
            </Icons>
            <Calendar>
              <input
                type="date"
                id="calendar"
                ref={calendarRef}
                onChange={onPickCalendarDate}
              />
            </Calendar>
          </WeekIcons>
        </Toolbar>
      </Header>
      <Planner>
        <DragDropContext onDragEnd={onDragEnd}>
          <DayContainer>
            {datesOfWeek.map((date) => (
              <Day key={date} date={date} />
            ))}
          </DayContainer>
        </DragDropContext>
      </Planner>
    </Wrapper>
  );
}

export default Main;

const Wrapper = styled.div`
  padding: 30px 30px 60px;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-family: "Montserrat Alternates", sans-serif;
  font-size: 1.6rem;
  font-style: italic;
  margin-bottom: 5px;
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
`;

const WeekDate = styled.h2`
  font-family: "Montserrat Alternates", sans-serif;
  font-size: 4.8rem;
  font-weight: 800;
  line-height: 48px;
`;

const WeekIcons = styled.div`
  display: flex;
  flex-direction: column;
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  column-gap: 40px;
`;

const Calendar = styled.div`
  input {
    width: 100%;
    height: 0;
    border: 0;
    padding: 0;
  }
`;

const Planner = styled.div``;

const DayContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;
